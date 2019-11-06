using FluentValidation;

namespace Application.Validators
{
    public static class ValidatorExtensions
    {
        public static IRuleBuilder<T, string> Password<T>(this IRuleBuilder<T,string> ruleBuilder)
        {
            var options = ruleBuilder
            .NotEmpty ()
            .MinimumLength(6).WithMessage("La contraseña debe contener mínimo 6 caracteres")
            .Matches("[A-Z]").WithMessage("La contraseña debe por lo menos contener una letra en mayúscula")
            .Matches("[a-z]").WithMessage("La contraseña debe contener por lo menos una letra en minúscula")
            .Matches("[0-9]").WithMessage("La contraseña debe contener por lo menos un número")
            .Matches("[^a-zA-Z0-9]").WithMessage("La contraseña debe contener caracteres que sean NO alfanuméricos (jaime123)");

            return options;
        }
    }
}