<template>
  <div class="nav-breadcrumb-wrap">
        <div class="container">
          <nav class="nav-breadcrumb">
            <a href="/">Home</a>
            <slot name="goods"></slot>
            <slot name="cart"></slot>
            <slot name="address"></slot>
            <slot name="orderconfirm"></slot>
          </nav>
        </div>
    </div>
</template>
