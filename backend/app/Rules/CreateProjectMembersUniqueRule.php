<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class CreateProjectMembersUniqueRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if(count($value) !== count(array_unique($value))){
            $fail('Идентификаторы всех пользователей пространства должны быть уникальны');
        }
    }
}
