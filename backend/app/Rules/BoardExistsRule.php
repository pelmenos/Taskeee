<?php

namespace App\Rules;

use App\Models\Board;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class BoardExistsRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if(!Board::where('id', $value)->whereNull('deleted_at')->exists()){
            $fail('Идентификатор доски должен относится к существующей доске');
        }
    }
}
