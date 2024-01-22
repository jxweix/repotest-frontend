import pandas as pd
from sklearn.cluster import KMeans
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import normalize
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import httpx

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Add your React app's origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# url:str = os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY")
# key:str = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_ENDPOINT = "https://iqdyhkjgaaimariweutv.supabase.co"
SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxZHloa2pnYWFpbWFyaXdldXR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE2MTAyMzcsImV4cCI6MjAxNzE4NjIzN30.X5HdI7Qew8UH9AzMeEJLTQPSIIX5ntDuGk1-6rMlBpw"

TABLE_NAME = 'userConjoin_front'

def fetch_data():
    with httpx.Client() as client:  # Use httpx.Client instead of httpx.AsyncClient
        response = client.get(
            f'{SUPABASE_ENDPOINT}/rest/v1/{TABLE_NAME}',
            headers={'apikey': SUPABASE_API_KEY},
            params={'select': '*'}  # Adjust the query parameters as needed
        )
        response.raise_for_status()  # Raise an error for unsuccessful HTTP responses
        data = response.json()
    return data


def load_data():
    data = fetch_data()
    return pd.DataFrame(data)

def create_user_item_matrix(data):
    user_item_matrix = data.groupby(['No', 'conJoin']).size().unstack(fill_value=0)
    # print("User-item matrix:\n", user_item_matrix)
    return user_item_matrix

def collaborative_filtering_cosine_similarity(user_item_matrix):
    # Check if the user_item_matrix is empty
    if user_item_matrix.empty:
        print("User-item matrix is empty.")
        return None

    # Check if the user_item_matrix has any NaN values
    if user_item_matrix.isna().any().any():
        print("User-item matrix contains NaN values. Please fill or handle missing values.")
        return None

    # Normalize the user-item matrix before computing cosine similarity
    user_item_matrix_normalized = normalize(user_item_matrix)

    # Compute cosine similarity
    cosine_sim = cosine_similarity(user_item_matrix_normalized, user_item_matrix_normalized)
    cosine_sim_df = pd.DataFrame(cosine_sim, index=user_item_matrix.index, columns=user_item_matrix.index)
    
    return cosine_sim_df

def kmeans(user_item_matrix):
    # Check if the user_item_matrix is empty
    if user_item_matrix.empty:
        print("User-item matrix is empty.")
        return None

    # Check if the user_item_matrix has any NaN values
    if user_item_matrix.isna().any().any():
        print("User-item matrix contains NaN values. Please fill or handle missing values.")
        return None

    # Drop any non-numeric columns if present
    user_item_matrix_numeric = user_item_matrix.select_dtypes(include=['number'])

    # Check if the user_item_matrix_numeric is empty after dropping non-numeric columns
    if user_item_matrix_numeric.empty:
        print("No numeric columns found in the user-item matrix.")
        return None

    # Normalize the user-item matrix
    user_item_matrix_normalized = normalize(user_item_matrix_numeric)

    # Perform KMeans clustering
    kmeans = KMeans(n_clusters=5, random_state=42)  # Adjust the number of clusters as needed
    user_item_matrix['cluster'] = kmeans.fit_predict(user_item_matrix_normalized)

    return user_item_matrix

def recommend(user_id, user_item_matrix, cosine_sim,threshold=2):
    # Get the cluster of the user
    user_cluster = user_item_matrix.loc[user_id, 'cluster']

    # Get all users in the same cluster
    cluster_users = user_item_matrix[user_item_matrix['cluster'] == user_cluster]

    # Exclude the current user from the recommendations
    cluster_users = cluster_users[cluster_users.index != user_id]

    # Check if there are other users in the same cluster
    if cluster_users.empty:
        print(f"No other users in the same cluster as User {user_id}.")
        return None

    # Calculate the cosine similarity between the target user and other users in the same cluster
    user_similarity = cosine_sim.loc[user_id, cluster_users.index]

    # Sort users based on similarity
    similar_users = user_similarity.sort_values(ascending=False)

    # Get the activities that the target user has not participated in
    user_activities = user_item_matrix.columns[user_item_matrix.loc[user_id].eq(0)]

    # Extract recommendations from similar users
    recommendations = user_item_matrix.loc[similar_users.index, user_activities]

    # Sum the participation scores across similar users
    recommendations_sum = recommendations.sum()
    
    # Filter activities based on the threshold
    recommended_activities = recommendations_sum[recommendations_sum >= threshold]

    # Sort recommendations by the sum of participation scores
    recommendations_sorted = recommended_activities.sort_index(ascending=False)
    
    

    return recommendations_sorted

@app.get("/user_id/{user_id}")
async def read_user_data(user_id: int):
    data = load_data()
    user_item_matrix = create_user_item_matrix(data)
    cosine_sim = collaborative_filtering_cosine_similarity(user_item_matrix)
    user_item_matrix = kmeans(user_item_matrix)

    if user_id not in user_item_matrix.index:
        raise HTTPException(status_code=404, detail="User not found")

    recommendations = recommend(user_id, user_item_matrix, cosine_sim)

    output_str = f"Top Recommendations for User {user_id}:\n"
    
    if recommendations is not None and not recommendations.empty:
        top_recommendations = recommendations.head(50)  # Adjust the number as needed
        for activity_id, score in top_recommendations.items():
            output_str += f"Activity ID {activity_id} has a score of {score}."
    else:
        output_str += "No recommendations found for the user."

    return JSONResponse(content={"message": output_str})
