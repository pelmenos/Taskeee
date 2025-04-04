<?php

namespace App\Rules;

use App\Models\SpaceUser;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class SpaceUserExistsRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if(!SpaceUser::where('id', $value)->whereNull('deleted_at')->exists()){
            $fail('Идентификатор пользователя пространства не относится ни к одному из пользователей пространства');
        }
    }
}
