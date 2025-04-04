<?php

namespace App\Rules;

use App\Models\SpaceRole;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class SpaceRoleNameExistsRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if(!SpaceRole::where('name', $value)->whereNull('deleted_at')->exists()){
            $fail('Поле Роль пространства должно относится к существующей роли пространства');
        }
    }
}
