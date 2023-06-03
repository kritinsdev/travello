<?php

use Illuminate\Support\Facades\Route;

Route::redirect('{any}', '/admin')->where('any', '.*');