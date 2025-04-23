<?php

namespace App\Http\Requests;

use App\Models\PaymentStatus;
use App\Models\Space;
use App\Models\Space\SpaceUser;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePaymentRequest extends FormRequest
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
        $spaceUser = SpaceUser::where(
            'email',
            User::findOrFail(auth()->id())->email
        )->firstOrFail();

        $space = Space::find($spaceUser->space_id);

        return [
            'sum' => 'decimal:2',
            'comment' => 'string|max:2500',
            'status_id' => 'integer|in:'
                . implode(',', PaymentStatus::pluck('id')->toArray()),
            'finance_project_id' => 'integer|in:'
                . implode(',', $space->financesProjects()->pluck('id')->toArray()),
            'subject_id' => 'integer|in:'
                . implode(',', $space->subjects()->pluck('id')->toArray()),
            'director_id' => 'uuid|in:'
                . implode(',', $spaceUser->users()->pluck('id')->toArray()),
            'recipient_id' => 'uuid|in:'
                . implode(',', $spaceUser->users()->pluck('id')->toArray()),
            'condition_id' => 'integer|in:'
                . implode(',', $space->conditions()->pluck('id')->toArray()),
            'method' => 'max:50|in:'
                . implode(',', ['Наличными', 'Безналичными', 'На Р/C'])
        ];
    }

    public function messages()
    {
        return [
            'sum.decimal' => 'Сумма должна быть с двумя знаками после запятой и иметь длинну не более 14 цифр',
            'comment.string' => 'Комментарий должен быть строкового типа',
            'comment.max' => 'Максимальное количество символов 2500',
            'status_id.integer' => 'Статус id должен быть целочисленного типа',
            'status_id.in' => 'Такого статуса не существует',
            'finance_project_id.integer' => 'ID проекта должен быть целочисленного типа',
            'finance_project_id.in' => 'Такого проекта не существует',
            'subject_id.integer' => 'ID предмета должен быть целочисленного типа',
            'subject_id.in' => 'Такого предмета не существует',
            'director_id.uuid' => 'ID постановщика за проект должен быть uuid',
            'director_id.in' => 'Такого постановщика не существует',
            'recipient_id.uuid' => 'ID получателя за проект должен быть uuid',
            'recipient_id.in' => 'Такого получателя не существует',
            'condition_id.integer' => 'ID условия проект должен быть целочисленного типа',
            'condition_id.in' => 'Такого условия не существует',
            'method.string' => 'Способ оплаты должен быть строкового типа',
            'method.in' => 'Способ оплаты должен быть: Наличными, Безналичными или На Р/C',
        ];
    }
}
