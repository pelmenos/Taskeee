<?php

namespace App\Http\Requests;

use App\Models\BudgetPaymentStatus;
use App\Models\Space;
use App\Models\SpaceUser;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class StoreBudgetPaymentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $spaceUser = SpaceUser::where(
            'email',
            User::findOrFail(auth()->id())->email
        )->firstOrFail();

        $space = Space::find($spaceUser->space_id);

        return [
            'sum' => 'decimal:2|required',
            'comment' => 'string|max:2500',
            'status_id' => 'required|integer|in:'
                . implode(',', BudgetPaymentStatus::pluck('id')->toArray()),
            'subject_id' => 'required|integer|in:'
                . implode(',', $space->subjects()->pluck('id')->toArray()),
            'director_id' => 'required|uuid|in:'
                . implode(',', $spaceUser->users()->pluck('id')->toArray()),
            'recipient_id' => 'required|uuid|in:'
                . implode(',', $spaceUser->users()->pluck('id')->toArray()),
            'condition_id' => 'required|integer|in:'
                . implode(',', $space->conditions()->pluck('id')->toArray()),
            'method' => 'required|max:50|in:'
                . implode(',', ['Наличными', 'Безналичными', 'На Р/C'])
        ];
    }

    public function messages()
    {
        return [
            'sum.decimal' => 'Сумма должна быть с двумя знаками после запятой и иметь длинну не более 14 цифр',
            'sum.required' => 'Сумма обязательна для заполнения',
            'comment.string' => 'Комментарий должен быть строкового типа',
            'comment.max' => 'Максимальное количество символов 2500',
            'status_id.integer' => 'Статус id должен быть целочисленного типа',
            'status_id.required' => 'Укажите статус',
            'status_id.in' => 'Такого статуса не существует',
            'subject_id.integer' => 'ID предмета должен быть целочисленного типа',
            'subject_id.required' => 'Предмет должен быть указан',
            'subject_id.in' => 'Такого предмета не существует',
            'director_id.uuid' => 'ID постановщика за проект должен быть uuid',
            'director_id.required' => 'Постановщик должен быть указан',
            'director_id.in' => 'Такого постановщика не существует',
            'recipient_id.uuid' => 'ID получателя за проект должен быть uuid',
            'recipient_id.required' => 'Получатель должен быть указан',
            'recipient_id.in' => 'Такого получателя не существует',
            'condition_id.integer' => 'ID условия проект должен быть целочисленного типа',
            'condition_id.required' => 'Условие должено быть указано',
            'condition_id.in' => 'Такого условия не существует',
            'method.string' => 'Способ оплаты должен быть строкового типа',
            'method.required' => 'Способ облаты обязателен',
            'method.in' => 'Способ оплаты должен быть: Наличными, Безналичными или На Р/C',
        ];
    }
}
