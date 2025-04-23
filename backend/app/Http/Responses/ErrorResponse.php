<?php

declare(strict_types=1);

namespace App\Http\Responses;

use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\Response;

final class ErrorResponse implements Responsable
{
    public function __construct(
        private readonly string $message,
        private readonly int    $status
    )
    {
    }

    /**
     * @param $request
     * @return Response
     */
    public function toResponse($request): Response
    {
        return response([
            'success' => false,
            'message' => $this->message
        ], $this->status, [
            'App-Version' => config('app.version'),
        ]);
    }
}
