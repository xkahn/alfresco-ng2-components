#!/usr/bin/env bash

#find affected libs
npm run affected:libs -- --uncommitted > deps.txt

#clean file
sed -i '/^$/d'  ./deps.txt
sed -i '/alfresco-components/d' ./deps.txt
sed -i '/nx affected:libs/d' ./deps.txt
sed -i '/^$/d'  ./deps.txt

#read result from file
while IFS= read -r var
do
    fileLine=$var
done < "./deps.txt"

echo "Libs changed: $fileLine";
#transform string to array
libs=(`echo $fileLine | sed 's/^$/\n/g'`)

if [[ "${deps}" == "content-services" ]]
then
    echo "NG2 components version required with -v | -version"
    exit 0
fi

#core
for i in "${libs[@]}"
do
    if [ "$i" == "core" ] ; then
        echo "CORE"
        echo "Build core"
        echo "Build content"
        echo "Build process"
        echo "Unit test core"
        echo "Unit test content"
        echo "Unit test process"
        #npm run build:core
        exit 0
    fi
done

#cloud
for i in "${libs[@]}"
do
    if [ "$i" == "process-services-cloud" ] ; then
        echo "CLOUD"
        echo "Build cloud"
        ng build process-services-cloud && \
        mkdir -p ./node_modules/@alfresco/adf-process-services-cloud/ && \
        cp -R ./lib/dist/process-services-cloud/* ./node_modules/@alfresco/adf-process-services-cloud/
        echo "Unit test cloud"
        ng test process-services-cloud --watch=false
        #npm run build:core
    fi
done

rm deps.txt
