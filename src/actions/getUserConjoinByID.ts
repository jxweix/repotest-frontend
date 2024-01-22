"use server"

import { Database } from "@App/types/database.types"
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

const getUserConJoinByID = async (userID: string) => {
    const cookieStore = cookies()
    console.log("🚀 ~ getUserConJoinByID ~ cookieStore:", cookieStore)

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
    const { data: typetbl } = await supabase
        .from('typetbl')
        .select('*')

    const tblObject = typetbl?.reduce((obj, item) => {
        obj[item.type_id] = {
            id: item.type_id,
            name: item.name,
            detail: item.detail,
        }
        return obj
    }, {})

    try {
        const { data: conJoin } = await supabase
            .from('userConjoin_front')
            .select('*')
            .eq('id', userID)
            
        if (conJoin?.[0]?.conJoin && Array.isArray(conJoin?.[0]?.conJoin)) {
            const optimizeData = conJoin?.[0]?.conJoin.map((item: any,) => {
                return tblObject[item]
            }).filter((i: any) => i)
            return optimizeData
        }
    } catch (error) {
        console.error(error);
    }
    
}

export default getUserConJoinByID