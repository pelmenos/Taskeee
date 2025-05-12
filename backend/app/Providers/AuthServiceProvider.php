<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use App\Models\BudgetPayment;
use App\Models\Project;
use App\Models\Space;
use App\Models\Condition;
use App\Models\FinanceProject;
use App\Models\Payment;
use App\Models\Subject;
use App\Policies\BudgetPaymentPolicy;
use App\Policies\ProjectPolicy;
use App\Policies\ConditionPolicy;
use App\Policies\FinanceProjectPolicy;
use App\Policies\PaymentPolicy;
use App\Policies\SpacePolicy;
use App\Policies\SubjectPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
        Space::class => SpacePolicy::class,
        Project::class => ProjectPolicy::class,
        FinanceProject::class => FinanceProjectPolicy::class,
        Subject::class => SubjectPolicy::class,
        Condition::class => ConditionPolicy::class,
        Payment::class => PaymentPolicy::class,
        BudgetPayment::class => BudgetPaymentPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        //
    }
}
