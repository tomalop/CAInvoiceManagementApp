import { useState, useEffect } from "react";

import { InvoicesClient } from "../api.js";

export function useGetInvoices() {
    const [ data, setData ] = useState(null);

    useEffect(() => {
        setData(apiGetInvoices());
    }, [ ])

    return data;
}

const invoicesClient = new InvoicesClient("http://localhost:5001");

async function apiGetInvoices() {
    const c = await invoicesClient.get();
    return c;
}