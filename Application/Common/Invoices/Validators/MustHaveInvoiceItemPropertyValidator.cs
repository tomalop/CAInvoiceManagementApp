using Application.Common.Invoices.ViewModels;
using FluentValidation.Validators;
using Microsoft.EntityFrameworkCore.Internal;
using System.Collections.Generic;

namespace Application.Common.Invoices.Validators
{
    public partial class CreateInvoiceCommandValidator
    {
        public class MustHaveInvoiceItemPropertyValidator : PropertyValidator
        {
            public MustHaveInvoiceItemPropertyValidator() 
                : base("Property {PropertyName} should not be an empty list.")
            {
            }
            protected override bool IsValid(PropertyValidatorContext context)
            {
                return context.PropertyValue is IList<InvoiceItemVm> list && list.Any();
            }
        }
    }
}