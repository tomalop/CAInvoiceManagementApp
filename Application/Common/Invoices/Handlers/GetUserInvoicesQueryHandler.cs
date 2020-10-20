using Application.Common.Invoices.Queries;
using MediatR;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using Application.Common.Invoices.ViewModels;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace Application.Common.Invoices.Handlers
{
    public class GetUserInvoicesQueryHandler : IRequestHandler<GetUserInvoicesQuery, IList<InvoiceVm>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        // Inject the Application DB Context here to query the data.
        public GetUserInvoicesQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<IList<InvoiceVm>> Handle(GetUserInvoicesQuery request, CancellationToken cancellationToken)
        {
            // Specify the query
            var result = new List<InvoiceVm>();
            var invoices = await _context.Invoices.Include(i => i.InvoiceItems)
                .Where(i => i.CreatedBy == request.User).ToListAsync(cancellationToken: cancellationToken);
            if (invoices != null) result = _mapper.Map<List<InvoiceVm>>(invoices);
            return result;
        }
    }
}