<?php

declare(strict_types=1);

namespace App\Http\Responses;

use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\Response;

final class SuccessEmptyResponse implements Responsable
{
    public function __construct(
        private readonly string $message,
        private readonly int    $status = 200
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
            'success' => true,
            'message' => $this->message
        ], $this->status, [
            'App-Version' => config('app.version'),
        ]);
    }
}
