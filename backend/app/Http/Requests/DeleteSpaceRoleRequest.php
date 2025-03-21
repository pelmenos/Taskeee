<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DeleteSpaceRoleRequest extends FormRequest
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
            'role_id' => $this->route('role_id')
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
            'role_id' => 'uuid|exists:space_roles,id'
        ];
    }

    public function messages(): array
    {
        return [
            'id.uuid' => 'Идентификатор пространства должен иметь тип данных UUID',
            'id.exists' => 'Идентификатор пространства должен относится к существующему пространству',
            'role_id.uuid' => 'Идентификатор роли пространства должен иметь тип данных UUID',
            'role_id.exists' => 'Идентификатор роли пространства должен быть относится к существующей роли пространства'
        ];
    }
}
