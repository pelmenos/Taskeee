<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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
            'name' => 'required|string|max:100',
            'description' => 'string|max:500',
            'avatar' => 'url:https',
            'tariff' => 'in:Free,Pro,Enterprise'
        ];
    }

    public function messages(): array
    {
        return [
            'id.required' => 'Идентификатор пространства должен быть передан в запросе', // Мб не нужна эта проверка, т.к есть другой роут где список выводится, и вообще по сути этот id является частью роута
            'id.exists' => 'Идентификатор пространства должен быть относится к существующему пространству',
            'name.required' => 'Поле Название обязательно для заполнения',
            'name.string' => 'Поле Название должно содержать строковой тип данных',
            'name.max' => 'Поле Название должно иметь максимальную длину в 100 символов',
            'description.string' => 'Поле Описание должно содержать строковой тип данных',
            'description.max' => 'Поле Описание должно иметь максимальную длину в 500 символов',
            'avatar.url' => 'Поле изображение должно содержать валидную ссылку на изображение с протоколом https',
            'tariff.in' => 'Поле Тариф должно содержать одно из значений: Free, Pro, Enterprise',
        ];
    }
}
