<?php

namespace App\Rules;

use App\Models\Task;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class TaskExistsRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if(!Task::where('id', $value)->whereNull('deleted_at')->exists()){
            $fail('Идентификатор задачи должен относится к существующей задаче');
        }
    }
}
