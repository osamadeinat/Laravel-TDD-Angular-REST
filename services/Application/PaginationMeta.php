<?php

namespace Services\Application;

trait PaginationMeta {

    public function getPaginationMeta($originalUrl , $count, $skip, $limit){

        $currentPage = (int) floor($skip / $limit) + 1;
        $pageCount = (int) floor($count / $limit) + 1;

        if($skip == 0){
            $currentPage = 1;
        }

        if($count <= $limit)
            $pageCount = 1;

        $meta = [];
        if($currentPage < $pageCount )
            $meta['next'] = $originalUrl . '?skip=' . ($skip + $limit) .'&limit=' . $limit;
        if($currentPage > 1)
            $meta['previous'] = $originalUrl . '?skip=' . ($skip - $limit) .'&limit=' . $limit;
        $meta['page_count'] = $pageCount;
        $meta['current_page'] = $currentPage;

        return $meta;
    }

}
