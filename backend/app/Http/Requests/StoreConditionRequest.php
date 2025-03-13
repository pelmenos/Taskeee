<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreConditionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'string|max:255|required'
        ];
    }

    public function messages()
    {
        return [
            'name.string' => 'Название должно быть строкового типа',
            'name.max' => 'Максимальное количетсов символов 255',
            'name.required' => 'Обязательно для заполнения'
        ];
    }
}
