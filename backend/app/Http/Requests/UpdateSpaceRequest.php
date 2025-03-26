<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateSpaceRequest extends FormRequest
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
            'id' => 'uuid|exists:spaces,id',
            'name' => 'required|string|max:100',
            'description' => 'required|string|max:500',
            'avatar' => 'required|url',
            'tariff' => 'required|in:Free,Pro,Enterprise'
        ];
    }

    public function messages(): array
    {
        return [
            'id.uuid' => 'Идентификатор пространства должен иметь тип данных UUID',
            'id.exists' => 'Идентификатор пространства должен относится к существующему пространству',
            'name.required' => 'Поле Название обязательно для заполнения',
            'name.string' => 'Поле Название должно содержать строковой тип данных',
            'name.max' => 'Поле Название должно иметь максимальную длину в 100 символов',
            'description.required' => 'Поле Описание обязательно для заполнения',
            'description.string' => 'Поле Описание должно содержать строковой тип данных',
            'description.max' => 'Поле Описание должно иметь максимальную длину в 500 символов',
            'avatar.required' => 'Поле Изображение обязательно для заполнения',
            'avatar.url' => 'Поле Изображение должно содержать валидную по формату ссылку',
            'tariff.required' => 'Поле Тариф обязательно для заполнения',
            'tariff.in' => 'Поле Тариф должно содержать одно из значений: Free, Pro, Enterprise'
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'message' => 'Ошибка при обновлении пространства',
            'errors' => $validator->errors()->getMessages(),
        ], 422));
    }
}
