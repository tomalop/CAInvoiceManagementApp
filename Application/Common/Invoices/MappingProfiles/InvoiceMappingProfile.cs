using Application.Common.Invoices.Commands;
using Application.Common.Invoices.ViewModels;
using AutoMapper;
using Domain.Entities;

namespace Application.Common.Invoices.MappingProfiles
{
    public class InvoiceMappingProfile : Profile
    {
        public InvoiceMappingProfile()
        {            
            CreateMap<Invoice, InvoiceVm>();
            CreateMap<InvoiceVm, Invoice>();

            CreateMap<InvoiceItem, InvoiceItemVm>();
            CreateMap<InvoiceItemVm, InvoiceItem>();

            CreateMap<CreateInvoiceCommand, Invoice>();
        }
    }
}