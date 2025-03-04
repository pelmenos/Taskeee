<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class getSpaceRequest extends FormRequest
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
            'id' => $this->route('id'),
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
            'id' => 'required|exists:spaces',
        ];
    }

    public function messages(): array
    {
        return [
            'id.required' => 'Идентификатор пространства должен быть передан в запросе', // Мб не нужна эта проверка, т.к есть другой роут где список выводится, и вообще по сути этот id является частью роута
            'id.exists' => 'Идентификатор пространства должен относится к существующему пространству',
        ];
    }
}
