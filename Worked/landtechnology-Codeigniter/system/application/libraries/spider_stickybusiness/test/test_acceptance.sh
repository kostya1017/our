#!/bin/bash
cd ..
php main.php  -x product-details -t "http://www.vitacost.com/airborne-effervescent-health-formula-orange" -v 1
php main.php  -x product-details -t "http://www.livamed.com/products/Nature%27s-Way-5%252dHTP-%252d-60-Tablets.html" -v 1


shops="
www.livamed.com
www.vitacost.com
www.vitaminshoppe.com
www.iherb.com
www.luckyvitamin.com
www.vitanherbs.com
"
[ -d test/tmp_acceptance ] || mkdir test/tmp_acceptance
for shop in $shops
do
  echo "##### testing $shop.... #####"
  echo "" > test/tmp_acceptance/acceptance_$shop.out
  php main.php  -t "http://$shop/" -x product-search-upc -i test/data/upc_acceptance.lst.csv -v 1 >> test/tmp_acceptance/acceptance_$shop.out
  php main.php  -t "http://$shop/" -x product-search -k  herbalife -v 1 >> test/tmp_acceptance/acceptance_$shop.out
done

