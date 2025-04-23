<?php

declare(strict_types=1);

namespace App\QueryFilters\API\V1;

use App\Contracts\QueryFilterContract;
use App\QueryBuilders\API\V1\SpaceQueryBuilder;

/**
 * @property-read SpaceQueryBuilder $builder
 */
final class SpaceQueryFilter extends QueryFilterContract
{
    /**
     * @param string $search
     * @return void
     */
    public function search(string $search): void
    {
        $this->builder->search($search);
    }
}
