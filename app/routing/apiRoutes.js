var friendData = require('../data/friends');

module.exports = function(app) {
    app.get('/api/friends', function(req, res) {
        res.json(friendData);
    });

    app.post('/api/friends', function(req, res) {
        friendData.push(req.body);
        console.log(req.body);
        var diffArray = [];
        for (var i = 0; i < friendData.length; i++) {
            var totalDifference = 0;
            if (friendData[i].name !== req.body.name) {
                for (var j = 0; j < req.body.scores.length; j++) {
                    totalDifference += Math.abs(parseInt(req.body.scores[j]) - friendData[i].scores[j]);
                }
                diffArray.push({index: i, difference: totalDifference});
            }
        }
        console.log(diffArray);
        var lowestDiff = diffArray[0].difference;
        var lowestDiffIndex = 0;
        for (var i = 1; i < diffArray.length; i++) {
            if (lowestDiff > diffArray[i].difference) {
                lowestDiff = diffArray[i].difference;
                lowestDiffIndex = i;
            }
        }
        console.log(lowestDiffIndex, lowestDiff);
        res.send(friendData[lowestDiffIndex]);
    });
};