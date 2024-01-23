use ("EVS");

db.Products.aggregate(
            {$project: {
                "id": "$_id",
                "isChildOfDesiredParent": {
                    $in: [category._id, "$categories._id"]
                }
            }}
            );