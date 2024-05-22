import { useEffect, useState } from 'react';
import { Database } from "@App/types/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient<Database>();
export const OneTableData = (tableName: keyof Database['public']['Tables']) => {
    const [tableData, setTableData] = useState<any>([]);

    useEffect(() => {
        const fetchData = async () => {
            let { data } = await supabase
                .from(tableName)
                .select('*');

            if (data) {
                setTableData(data);
            }
        };
        fetchData();
    }, []);

    return tableData;
};

export const OneTableDataEq = (tableName: keyof Database['public']['Tables'], row: any, param: any) => {
    const [tableData, setTableData] = useState<any>([]);

    useEffect(() => {
        const fetchData = async () => {
            let { data } = await supabase
                .from(tableName)
                .select('*')
                .eq(row, param)

            if (data) {
                setTableData(data);
            }
        };
        fetchData();
    }, []);

    return tableData;
};

export const OneTableDataArray = (tableName: keyof Database['public']['Tables'], row: any, param: any) => {
    const [tableData, setTableData] = useState<any>([]);

    useEffect(() => {
        const fetchData = async () => {
            let { data } = await supabase
                .from(tableName)
                .select('*')
                .in(row, param)

            if (data) {
                setTableData(data);
            }
        };
        fetchData();
    }, []);

    return tableData;
};

export const ConTableDataEq = (one: keyof Database['public']['Tables'], two: keyof Database['public']['Tables'], row: any, param: any) => {
    const [tableData, setTableData] = useState<any>([]);
    useEffect(() => {
        const fetchData = async () => {
            let { data } = await supabase
                .from(one)
                .select(`*, other:${two}(*)`)
                .eq(row, param)

            if (data) {
                setTableData(data);
            }
        };
        fetchData();
    }, []);
    return tableData
}

export const ConTableDataArray = (one: keyof Database['public']['Tables'], two: keyof Database['public']['Tables'], row: any, param: any) => {
    const [tableData, setTableData] = useState<any>([]);
    useEffect(() => {
        const fetchData = async () => {
            let { data } = await supabase
                .from(one)
                .select(`*, other:${two}(*)`)
                .in(row, param)

            if (data) {
                setTableData(data);
            }
        };
        fetchData();
    }, []);
    return tableData
}