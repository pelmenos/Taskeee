<?php

namespace App\Rules;

use App\Models\Project;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ProjectExistsRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if(!Project::where('id', $value)->whereNull('deleted_at')->exists()){
            $fail('Идентификатор проекта должен относится к существующему проекту');
        }
    }
}
