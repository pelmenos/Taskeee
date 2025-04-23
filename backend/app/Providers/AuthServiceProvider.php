<?php

declare(strict_types=1);

namespace App\Providers;

use App\Models\Condition;
use App\Models\FinanceProject;
use App\Models\Payment;
use App\Models\Project;
use App\Models\Space;
use App\Models\Subject;
use App\Policies\API\V1\SpacePolicy;
use App\Policies\ConditionPolicy;
use App\Policies\FinanceProjectPolicy;
use App\Policies\PaymentPolicy;
use App\Policies\ProjectPolicy;
use App\Policies\SubjectPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

final class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
        Project::class => ProjectPolicy::class,
        FinanceProject::class => FinanceProjectPolicy::class,
        Subject::class => SubjectPolicy::class,
        Condition::class => ConditionPolicy::class,
        Payment::class => PaymentPolicy::class,
        Space::class => SpacePolicy::class,
    ];

    /**
     * @return void
     */
    public function boot(): void
    {
        $this->registerPolicies();

        //
    }
}
