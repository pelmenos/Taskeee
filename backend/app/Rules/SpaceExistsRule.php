<?php

namespace App\Rules;

use App\Models\Space;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class SpaceExistsRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if(!Space::where('id', $value)->whereNull('deleted_at')->exists()){
            $fail('Идентификатор пространства должен относится к существующему пространству');
        }
    }
}
