<?php

namespace App\Rules;

use App\Models\Space\SpaceRole;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class SpaceRoleExistsRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if(!SpaceRole::where('id', $value)->whereNull('deleted_at')->exists()){
            $fail('Идентификатор роли пространства должен относится к существующей роли пространства');
        }
    }
}
