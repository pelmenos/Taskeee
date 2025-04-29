<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSubjectRequest extends FormRequest
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
            'name' => 'string|max:255',
            'description' => 'string|max:1000'
        ];
    }

    public function messages()
    {
        return [
            'name.string' => 'Название должно быть строкового типа',
            'name.max' => 'Максимальное количество символов 255',
            'description.string' => 'Описание должно быть строкового типа',
            'description.max' => 'Максимальное количество симолов 1000'
        ];
    }
}
