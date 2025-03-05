<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateSpaceRoleRequest extends FormRequest
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
            'id' => 'uuid|exists:spaces',
            'name' => 'required|string|max:100',
            'description' => 'string|max:500',
            'permissions' => 'required|array',
            'permissions.finance_access' => 'required|boolean',
            'permissions.projects_access' => 'required|boolean',
            'permissions.team_access' => 'required|boolean',
            'permissions.full_access' => 'required|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'id.uuid' => 'Идентификатор пространства должен иметь тип данных UUID',
            'id.exists' => 'Идентификатор пространства должен быть относится к существующему пространству',
            'name.required' => 'Поле Название обязательно для заполнения',
            'name.string' => 'Поле Название должно содержать строковой тип данных',
            'name.max' => 'Поле Название должно иметь максимальную длину в 100 символов',
            'description.string' => 'Поле Описание должно содержать строковой тип данных',
            'description.max' => 'Поле Описание должно иметь максимальную длину в 500 символов',
            'permissions.required' => 'Поле Права доступа обязательно для заполнения',
            'permissions.array' => 'Поле Права доступа должно быть массивом',
            'permissions.finance_access.required' => 'Поле Доступ к финансам обязательно для заполнения',
            'permissions.projects_access.required' => 'Поле Доступ к проектам обязательно для заполнения',
            'permissions.team_access.required' => 'Поле Доступ к команде обязательно для заполнения',
            'permissions.full_access.required' => 'Поле Полный доступ обязательно для заполнения',
            'permissions.finance_access.boolean' => 'Поле Доступ к финансам должно содержать логический тип данных',
            'permissions.projects_access.boolean' => 'Поле Доступ к проектам должно содержать логический тип данных',
            'permissions.team_access.boolean' => 'Поле Доступ к команде должно содержать логический тип данных',
            'permissions.full_access.boolean' => 'Поле Полный доступ должно содержать логический тип данных',
        ];
    }
}
