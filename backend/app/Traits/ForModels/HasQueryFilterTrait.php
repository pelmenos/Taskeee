<?php

namespace App\Traits\ForModels;

use App\Contracts\QueryFilterContract;
use Illuminate\Database\Eloquent\Builder;

trait HasQueryFilterTrait
{
    /**
     * @param Builder $builder
     * @param QueryFilterContract $filter
     * @param array $fields
     * @return void
     */
    public function scopeFilter(Builder $builder, QueryFilterContract $filter, array $fields): void
    {
        $filter->apply($builder, $fields);
    }
}
