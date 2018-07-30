<template>
    <div>
        <nav class="col-md-2 d-none d-md-block bg-light sidebar">
            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>後台模擬功能</span>
                <a class="d-flex align-items-center text-muted" href="#">
                    <span data-feather="plus-circle"></span>
                </a>
            </h6>
            <div class="sidebar-sticky">
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <!-- 使用router-link 前往其他router頁面  -->
                        <router-link to="/admin/products" class="nav-link active" >
                            <i class="fas fa-shopping-bag"></i>
                            後台管理功能
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <!-- 使用router-link 前往其他router頁面  -->
                        <router-link to="/admin/order" class="nav-link" >
                            <i class="fas fa-shopping-bag"></i>
                            訂單列表
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <!-- 使用router-link 前往其他router頁面  -->
                        <router-link to="/admin/coupons" class="nav-link" >
                            <i class="fas fa-shopping-bag"></i>
                            優惠券
                        </router-link>
                    </li>
                </ul>

                <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>前台模擬功能</span>
                <a class="d-flex align-items-center text-muted" href="#">
                    <span data-feather="plus-circle"></span>
                </a>
                </h6>
                <ul class="nav flex-column mb-2">
                    
                <li class="nav-item">
                    <router-link to="/custom_order" class="nav-link active" >
                        <i class="fas fa-shopping-bag"></i>
                        模擬訂單
                    </router-link>
                </li>
                
                </ul>
            </div>
        </nav>
    </div>
</template>