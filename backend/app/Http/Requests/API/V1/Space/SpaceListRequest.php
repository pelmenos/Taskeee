<?php

declare(strict_types=1);

namespace App\Http\Requests\API\V1\Space;

use App\DTOs\API\V1\Space\SpaceListDto;
use Illuminate\Foundation\Http\FormRequest;

final class SpaceListRequest extends FormRequest
{
    /**
     * @return bool
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * @return array
     */
    public function rules(): array
    {
        return [
            'search' => ['nullable', 'string'],
            'limit' => ['nullable', 'int'],
        ];
    }

    /**
     * @return array
     */
    public function queryParameters(): array
    {
        return [
            'search' => [
                'description' => 'Поисковой запрос',
                'example' => 'Моя доска',
            ],
            'limit' => [
                'description' => 'Кол-во элементов на странице',
                'example' => 10,
            ],
        ];
    }

    /**
     * @return SpaceListDto
     */
    public function toDto(): SpaceListDto
    {
        $fields = $this->validated();

        return new SpaceListDto(...[
            'search' => $fields['search'] ?? null,
            'limit' => $fields['limit'] ?? null,
        ]);
    }
}
