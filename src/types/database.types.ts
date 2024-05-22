export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      aboutMe: {
        Row: {
          fburl: string | null
          ghurl: string | null
          igurl: string | null
          imageurl: string | null
          name: string
          no: number
          role: string | null
        }
        Insert: {
          fburl?: string | null
          ghurl?: string | null
          igurl?: string | null
          imageurl?: string | null
          name: string
          no?: number
          role?: string | null
        }
        Update: {
          fburl?: string | null
          ghurl?: string | null
          igurl?: string | null
          imageurl?: string | null
          name?: string
          no?: number
          role?: string | null
        }
        Relationships: []
      }
      activities: {
        Row: {
          details_activities: string | null
          id_activities: number
          image_url: string | null
          name_activities: string | null
          type_activities: string | null
        }
        Insert: {
          details_activities?: string | null
          id_activities?: number
          image_url?: string | null
          name_activities?: string | null
          type_activities?: string | null
        }
        Update: {
          details_activities?: string | null
          id_activities?: number
          image_url?: string | null
          name_activities?: string | null
          type_activities?: string | null
        }
        Relationships: []
      }
      activity_show: {
        Row: {
          createdbyUser: number | null
          detail: string | null
          id: number
          name: string | null
          src: string | null
          srcGroup: Json | null
          type_id: number | null
        }
        Insert: {
          createdbyUser?: number | null
          detail?: string | null
          id?: number
          name?: string | null
          src?: string | null
          srcGroup?: Json | null
          type_id?: number | null
        }
        Update: {
          createdbyUser?: number | null
          detail?: string | null
          id?: number
          name?: string | null
          src?: string | null
          srcGroup?: Json | null
          type_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "activity_show_createdbyUser_fkey"
            columns: ["createdbyUser"]
            isOneToOne: false
            referencedRelation: "user_test"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activity_show_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "typetbl"
            referencedColumns: ["type_id"]
          },
        ]
      }
      boardtbl: {
        Row: {
          createDate: string | null
          detail: string | null
          id: string
          keyCreateByUser: string
          KeyMap: string | null
          keyPhoto: number | null
          keyType: string | null
          nameBoard: string | null
          outActivityTime: string | null
          startActivityTime: string | null
          timeOutBoard: string | null
          updateDate: string | null
        }
        Insert: {
          createDate?: string | null
          detail?: string | null
          id?: string
          keyCreateByUser: string
          KeyMap?: string | null
          keyPhoto?: number | null
          keyType?: string | null
          nameBoard?: string | null
          outActivityTime?: string | null
          startActivityTime?: string | null
          timeOutBoard?: string | null
          updateDate?: string | null
        }
        Update: {
          createDate?: string | null
          detail?: string | null
          id?: string
          keyCreateByUser?: string
          KeyMap?: string | null
          keyPhoto?: number | null
          keyType?: string | null
          nameBoard?: string | null
          outActivityTime?: string | null
          startActivityTime?: string | null
          timeOutBoard?: string | null
          updateDate?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "boardtbl_keyCreateByUser_fkey"
            columns: ["keyCreateByUser"]
            isOneToOne: false
            referencedRelation: "user_test"
            referencedColumns: ["keyUser"]
          },
          {
            foreignKeyName: "boardtbl_KeyMap_fkey"
            columns: ["KeyMap"]
            isOneToOne: false
            referencedRelation: "placetbl"
            referencedColumns: ["keyMap"]
          },
        ]
      }
      placetbl: {
        Row: {
          activeTime: string | null
          detail: string | null
          keyMap: string
          nameMap: string | null
        }
        Insert: {
          activeTime?: string | null
          detail?: string | null
          keyMap: string
          nameMap?: string | null
        }
        Update: {
          activeTime?: string | null
          detail?: string | null
          keyMap?: string
          nameMap?: string | null
        }
        Relationships: []
      }
      release_boardtbl: {
        Row: {
          createDate: string | null
          detail: string | null
          keyBoard: string
          keyCreateByUser: string
          keyImage: number | null
          keyMap: string | null
          nameBoard: string | null
          outActivityTime: string | null
          startActivityTime: string | null
          timeOutBoard: string | null
          type_id: string | null
          updateDate: string | null
        }
        Insert: {
          createDate?: string | null
          detail?: string | null
          keyBoard?: string
          keyCreateByUser: string
          keyImage?: number | null
          keyMap?: string | null
          nameBoard?: string | null
          outActivityTime?: string | null
          startActivityTime?: string | null
          timeOutBoard?: string | null
          type_id?: string | null
          updateDate?: string | null
        }
        Update: {
          createDate?: string | null
          detail?: string | null
          keyBoard?: string
          keyCreateByUser?: string
          keyImage?: number | null
          keyMap?: string | null
          nameBoard?: string | null
          outActivityTime?: string | null
          startActivityTime?: string | null
          timeOutBoard?: string | null
          type_id?: string | null
          updateDate?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "release_boardtbl_keyCreateByUser_fkey"
            columns: ["keyCreateByUser"]
            isOneToOne: false
            referencedRelation: "user_test"
            referencedColumns: ["keyUser"]
          },
          {
            foreignKeyName: "release_boardtbl_keyImage_fkey"
            columns: ["keyImage"]
            isOneToOne: false
            referencedRelation: "release_type_img"
            referencedColumns: ["keyImage"]
          },
          {
            foreignKeyName: "release_boardtbl_keyMap_fkey"
            columns: ["keyMap"]
            isOneToOne: false
            referencedRelation: "placetbl"
            referencedColumns: ["keyMap"]
          },
        ]
      }
      release_type_img: {
        Row: {
          keyImage: number
          src: string | null
          type_id: number | null
        }
        Insert: {
          keyImage?: number
          src?: string | null
          type_id?: number | null
        }
        Update: {
          keyImage?: number
          src?: string | null
          type_id?: number | null
        }
        Relationships: []
      }
      typetbl: {
        Row: {
          detail: string
          gatherlink: string | null
          nametype: string
          type_id: number
        }
        Insert: {
          detail: string
          gatherlink?: string | null
          nametype: string
          type_id?: number
        }
        Update: {
          detail?: string
          gatherlink?: string | null
          nametype?: string
          type_id?: number
        }
        Relationships: []
      }
      user: {
        Row: {
          id_user: number
          name_user: string
        }
        Insert: {
          id_user?: number
          name_user?: string
        }
        Update: {
          id_user?: number
          name_user?: string
        }
        Relationships: []
      }
      user_test: {
        Row: {
          email: string
          id: number
          keyUser: string
          user_name: string | null
        }
        Insert: {
          email: string
          id?: number
          keyUser?: string
          user_name?: string | null
        }
        Update: {
          email?: string
          id?: number
          keyUser?: string
          user_name?: string | null
        }
        Relationships: []
      }
      userConjoin_front: {
        Row: {
          conJoin: Json | null
          id: string
          No: number
        }
        Insert: {
          conJoin?: Json | null
          id: string
          No?: number
        }
        Update: {
          conJoin?: Json | null
          id?: string
          No?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
