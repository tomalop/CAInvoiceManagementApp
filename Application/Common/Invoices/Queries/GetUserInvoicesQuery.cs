using System.Collections;
using System.Collections.Generic;
using MediatR;
using System.Net.Sockets;
using Application.Common.Invoices.ViewModels;

namespace Application.Common.Invoices.Queries
{
    public class GetUserInvoicesQuery : IRequest<IList<InvoiceVm>>
    {
        // User ID of the current user
         public string User { get; set; }
    }
}