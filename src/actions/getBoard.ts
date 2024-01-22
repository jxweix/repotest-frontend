"use server"

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from "next/headers"
import getUserConJoinByID from './getUserConjoinByID'

const getBoard = async (userID: string) => {
    console.log("🚀 ~ getBoard ~ userID:", userID)
    const cookieStore = cookies()

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    cookieStore.set({ name, value, ...options })
                },
                remove(name: string, options: CookieOptions) {
                    cookieStore.set({ name, value: '', ...options })
                },
            },
        }
    )
    const { data: keyImage } = await supabase
        .from('release_type_img')
        .select('*')

    const dataConJoin = await getUserConJoinByID(userID)
    console.log("🚀 ~ getBoard ~ userID:", userID)
    console.log("🚀 ~ getBoard ~ dataConJoin:", dataConJoin)

    const tblObject = keyImage?.reduce((obj, item) => {
        const conJoinData = dataConJoin.find((conJoinItem: any) =>
            conJoinItem.type_id === item.type_id);

        if (conJoinData) {
            obj[item.type_id] = {
                type_id: item.type_id,
                src: item.src,
                name: conJoinData.name,
            };
        }

        return obj;
    }, {});

    console.log("🚀 ~ tblObject ~ tblObject:", tblObject)
    return tblObject;

    // try {
    //     const { data: conJoin } = await supabase
    //         .from('release_boardtbl')
    //         .select('*')
    //         .eq('keyType', userID)
    //     console.log("🚀 ~ getBoard ~ conJoin:", conJoin)
    //     if (conJoin?.[0]?.conJoin && Array.isArray(conJoin?.[0]?.conJoin)) {
    //         const optimizeData = conJoin?.[0]?.conJoin.map((item: any,) => {
    //             return tblObject[item]
    //         }).filter((i: any) => i)
    //         return optimizeData
    //     }
    // } catch (error) {
    //     console.error(error);
    // }
}

export default getBoard