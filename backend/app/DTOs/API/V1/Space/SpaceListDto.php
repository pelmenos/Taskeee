<?php

declare(strict_types=1);

namespace App\DTOs\API\V1\Space;

use App\Traits\ForDTOs\UseAsArrayTrait;

final readonly class SpaceListDto
{
    use UseAsArrayTrait;

    /**
     * @param string|null $search
     * @param int|null $limit
     */
    public function __construct(
        public string|null $search = null,
        public int|null    $limit = 10,
    )
    {
    }
}
