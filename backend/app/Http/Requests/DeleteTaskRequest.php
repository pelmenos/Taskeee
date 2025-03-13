<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DeleteTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'id' => $this->route('id')
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id' => 'uuid|exists:tasks,id'
        ];
    }

    public function messages(): array
    {
        return [
            'id.uuid' => 'Идентификатор задачи должен иметь тип данных UUID',
            'id.exists' => 'Идентификатор задачи не относится ни к одной из задач'
        ];
    }
}
