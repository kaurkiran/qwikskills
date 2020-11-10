<title>
    <?php if(sizeof($urlData)!=0){?>
    <?php if(sizeof($urlData['breadcrumb'])!=0){?>
    <?php echo $urlData['breadcrumb'][0]['nav_tab_display_name']?> < <?php echo $urlData['breadcrumb'][0]['home_navigation']->nav_tab_display_name; echo ""?>
    <?php } else { echo '';}?>
    <?php } else { echo 'Dashboard';}?>
</title>

