<?php

declare(strict_types=1);

namespace App\Traits\ForDTOs;

trait UseAsArrayTrait
{
    /**
     * @return array
     */
    public function toArray(): array
    {
        return array_filter((array)$this);
    }
}
