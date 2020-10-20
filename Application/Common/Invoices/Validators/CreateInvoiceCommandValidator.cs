using Application.Common.Invoices.Commands;
using FluentValidation;
using FluentValidation.Resources;
using Microsoft.EntityFrameworkCore.Internal;
using System.Collections;
using System.Collections.Generic;
using Application.Common.Invoices.ViewModels;

namespace Application.Common.Invoices.Validators
{
    public partial class CreateInvoiceCommandValidator : AbstractValidator<CreateInvoiceCommand>
    {
        public CreateInvoiceCommandValidator()
        {
            RuleFor(v => v.AmountPaid).NotNull();
            RuleFor(v => v.Date).NotNull();
            RuleFor(v => v.From).NotEmpty().MinimumLength(3);
            RuleFor(v => v.To).NotEmpty().MinimumLength(3);
            RuleFor(v => v.InvoiceItems).NotEmpty();
        }
    }
}