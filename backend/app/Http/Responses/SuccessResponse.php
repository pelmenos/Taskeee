<?php

declare(strict_types=1);

namespace App\Http\Responses;

use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response;
use Illuminate\Pagination\AbstractPaginator;
use Illuminate\Support\Arr;
use Symfony\Component\HttpFoundation\Response as SymphonyResponse;

final class SuccessResponse implements Responsable
{
    public function __construct(
        private readonly SymphonyResponse|Responsable|string|array $response,
        private readonly string                                    $message = '',
        private readonly int                                       $status = 200
    )
    {
    }

    /**
     * @param $request
     * @return Response
     */
    public function toResponse($request): Response
    {
        $response = [
            'success' => true,
            'message' => $this->message,
            'data' => $this->getData(),
        ];

        if ($pagination = $this->getPaginationFromResource()) {
            $response = $response + $pagination;
        }

        return response($response, $this->status, [
            'App-Version' => config('app.version'),
        ]);
    }

    /**
     * @return array|Responsable|mixed|string|SymphonyResponse
     */
    private function getData(): mixed
    {
        return $this->response instanceof SymphonyResponse
            ? json_decode($this->response->getContent(), true)
            : $this->response;
    }

    /**
     * @return bool|array
     */
    private function getPaginationFromResource(): bool|array
    {
        if (!($this->response instanceof JsonResource && $this->response->resource instanceof AbstractPaginator)) {
            return false;
        }

        $paginated = $this->response->resource->toArray();

        return [
            'links' => $this->paginationLinks($paginated),
            'meta' => $this->meta($paginated),
        ];

    }

    /**
     * @param array $paginated
     * @return array
     */
    private function paginationLinks(array $paginated): array
    {
        return [
            'first' => $paginated['first_page_url'] ?? null,
            'last' => $paginated['last_page_url'] ?? null,
            'prev' => $paginated['prev_page_url'] ?? null,
            'next' => $paginated['next_page_url'] ?? null,
        ];
    }

    /**
     * @param array $paginated
     * @return array
     */
    private function meta(array $paginated): array
    {
        return Arr::except($paginated, [
            'data',
            'first_page_url',
            'last_page_url',
            'prev_page_url',
            'next_page_url',
        ]);
    }

}
