import React, { useState, useEffect } from "react";
import { InvoiceVm, InvoicesClient } from "../../utils/api";
import { Table } from "reactstrap";
import {getBalance} from "../../utils/invoiceUtils";
import moment from "moment";

interface Props {
  
}

const Invoices = (props: Props) => {
  const [invoices, setInvoices] = useState<InvoiceVm[]>([]);
  const client = new InvoicesClient();
 
  useEffect(() => {
    client.get().then(res => setInvoices(res))
      .catch(err => console.log(err));
  }, [])
  return (
    <div>
      <Table striped>
        <thead>
          <tr>
            <th>Invoice #</th>
            <th>Date</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {invoices && invoices.map(invoice =>
          <tr key={`invoice-${invoice.id}`}>
            <td>{invoice.invoiceNumber}</td>
            <td>{invoice.date && moment(invoice.date).format("MMMM D YYYY")}</td>
            <td>{getBalance(invoice)}</td>
          </tr>)}
        </tbody>
      </Table>
    </div>
  )
}

export default Invoices
