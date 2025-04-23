<?php

namespace App\Contracts;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

abstract class QueryFilterContract
{
    /**
     * @var Builder
     */
    protected Builder $builder;

    /**
     * @param Builder $builder
     * @param array $fields
     * @return void
     */
    public function apply(Builder $builder, array $fields): void
    {
        $this->builder = $builder;

        foreach ($fields as $field => $value) {
            $method = Str::camel($field);

            if (method_exists($this, $method)) {
                call_user_func_array([$this, $method], [$value]);
            }
        }
    }
}
