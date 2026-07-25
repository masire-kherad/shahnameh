/** Compact files are string[]; legacy files are { summaries: string[] }. */
function normalizeSummaries(raw: unknown): string[] {
  if (Array.isArray(raw)) {
    return raw.filter((item): item is string => typeof item === 'string');
  }
  if (raw && typeof raw === 'object' && Array.isArray((raw as { summaries?: unknown }).summaries)) {
    return (raw as { summaries: unknown[] }).summaries.filter(
      (item): item is string => typeof item === 'string'
    );
  }
  return [];
}

export const loadPoemSummaries = (poemId: number): string[] => {
  let summaryFile: unknown;
  switch (poemId) {
    case 1321:
      summaryFile = require('../assets/db/summaries/1321.json');
      break;
    case 1322:
      summaryFile = require('../assets/db/summaries/1322.json');
      break;
    case 1323:
      summaryFile = require('../assets/db/summaries/1323.json');
      break;
    case 1324:
      summaryFile = require('../assets/db/summaries/1324.json');
      break;
    case 1325:
      summaryFile = require('../assets/db/summaries/1325.json');
      break;
    case 1326:
      summaryFile = require('../assets/db/summaries/1326.json');
      break;
    case 1327:
      summaryFile = require('../assets/db/summaries/1327.json');
      break;
    case 1328:
      summaryFile = require('../assets/db/summaries/1328.json');
      break;
    case 1329:
      summaryFile = require('../assets/db/summaries/1329.json');
      break;
    case 1330:
      summaryFile = require('../assets/db/summaries/1330.json');
      break;
    case 1331:
      summaryFile = require('../assets/db/summaries/1331.json');
      break;
    case 1332:
      summaryFile = require('../assets/db/summaries/1332.json');
      break;
    case 1335:
      summaryFile = require('../assets/db/summaries/1335.json');
      break;
    case 1336:
      summaryFile = require('../assets/db/summaries/1336.json');
      break;
    case 1337:
      summaryFile = require('../assets/db/summaries/1337.json');
      break;
    case 1338:
      summaryFile = require('../assets/db/summaries/1338.json');
      break;
    case 1339:
      summaryFile = require('../assets/db/summaries/1339.json');
      break;
    case 1341:
      summaryFile = require('../assets/db/summaries/1341.json');
      break;
    case 1342:
      summaryFile = require('../assets/db/summaries/1342.json');
      break;
    case 1343:
      summaryFile = require('../assets/db/summaries/1343.json');
      break;
    case 1344:
      summaryFile = require('../assets/db/summaries/1344.json');
      break;
    case 1345:
      summaryFile = require('../assets/db/summaries/1345.json');
      break;
    case 1346:
      summaryFile = require('../assets/db/summaries/1346.json');
      break;
    case 1347:
      summaryFile = require('../assets/db/summaries/1347.json');
      break;
    case 1348:
      summaryFile = require('../assets/db/summaries/1348.json');
      break;
    case 1349:
      summaryFile = require('../assets/db/summaries/1349.json');
      break;
    case 1350:
      summaryFile = require('../assets/db/summaries/1350.json');
      break;
    case 1351:
      summaryFile = require('../assets/db/summaries/1351.json');
      break;
    case 1352:
      summaryFile = require('../assets/db/summaries/1352.json');
      break;
    case 1353:
      summaryFile = require('../assets/db/summaries/1353.json');
      break;
    case 1354:
      summaryFile = require('../assets/db/summaries/1354.json');
      break;
    case 1355:
      summaryFile = require('../assets/db/summaries/1355.json');
      break;
    case 1356:
      summaryFile = require('../assets/db/summaries/1356.json');
      break;
    case 1357:
      summaryFile = require('../assets/db/summaries/1357.json');
      break;
    case 1358:
      summaryFile = require('../assets/db/summaries/1358.json');
      break;
    case 1359:
      summaryFile = require('../assets/db/summaries/1359.json');
      break;
    case 1360:
      summaryFile = require('../assets/db/summaries/1360.json');
      break;
    case 1361:
      summaryFile = require('../assets/db/summaries/1361.json');
      break;
    case 1362:
      summaryFile = require('../assets/db/summaries/1362.json');
      break;
    case 1363:
      summaryFile = require('../assets/db/summaries/1363.json');
      break;
    case 1364:
      summaryFile = require('../assets/db/summaries/1364.json');
      break;
    case 1365:
      summaryFile = require('../assets/db/summaries/1365.json');
      break;
    case 1366:
      summaryFile = require('../assets/db/summaries/1366.json');
      break;
    case 1367:
      summaryFile = require('../assets/db/summaries/1367.json');
      break;
    case 1368:
      summaryFile = require('../assets/db/summaries/1368.json');
      break;
    case 1369:
      summaryFile = require('../assets/db/summaries/1369.json');
      break;
    case 1370:
      summaryFile = require('../assets/db/summaries/1370.json');
      break;
    case 1371:
      summaryFile = require('../assets/db/summaries/1371.json');
      break;
    case 1372:
      summaryFile = require('../assets/db/summaries/1372.json');
      break;
    case 1373:
      summaryFile = require('../assets/db/summaries/1373.json');
      break;
    case 1374:
      summaryFile = require('../assets/db/summaries/1374.json');
      break;
    case 1375:
      summaryFile = require('../assets/db/summaries/1375.json');
      break;
    case 1376:
      summaryFile = require('../assets/db/summaries/1376.json');
      break;
    case 1377:
      summaryFile = require('../assets/db/summaries/1377.json');
      break;
    case 1378:
      summaryFile = require('../assets/db/summaries/1378.json');
      break;
    case 1379:
      summaryFile = require('../assets/db/summaries/1379.json');
      break;
    case 1380:
      summaryFile = require('../assets/db/summaries/1380.json');
      break;
    case 1381:
      summaryFile = require('../assets/db/summaries/1381.json');
      break;
    case 1382:
      summaryFile = require('../assets/db/summaries/1382.json');
      break;
    case 1383:
      summaryFile = require('../assets/db/summaries/1383.json');
      break;
    case 1384:
      summaryFile = require('../assets/db/summaries/1384.json');
      break;
    case 1385:
      summaryFile = require('../assets/db/summaries/1385.json');
      break;
    case 1386:
      summaryFile = require('../assets/db/summaries/1386.json');
      break;
    case 1387:
      summaryFile = require('../assets/db/summaries/1387.json');
      break;
    case 1388:
      summaryFile = require('../assets/db/summaries/1388.json');
      break;
    case 1389:
      summaryFile = require('../assets/db/summaries/1389.json');
      break;
    case 1390:
      summaryFile = require('../assets/db/summaries/1390.json');
      break;
    case 1391:
      summaryFile = require('../assets/db/summaries/1391.json');
      break;
    case 1392:
      summaryFile = require('../assets/db/summaries/1392.json');
      break;
    case 1393:
      summaryFile = require('../assets/db/summaries/1393.json');
      break;
    case 1394:
      summaryFile = require('../assets/db/summaries/1394.json');
      break;
    case 1395:
      summaryFile = require('../assets/db/summaries/1395.json');
      break;
    case 1396:
      summaryFile = require('../assets/db/summaries/1396.json');
      break;
    case 1397:
      summaryFile = require('../assets/db/summaries/1397.json');
      break;
    case 1398:
      summaryFile = require('../assets/db/summaries/1398.json');
      break;
    case 1399:
      summaryFile = require('../assets/db/summaries/1399.json');
      break;
    case 1400:
      summaryFile = require('../assets/db/summaries/1400.json');
      break;
    case 1401:
      summaryFile = require('../assets/db/summaries/1401.json');
      break;
    case 1402:
      summaryFile = require('../assets/db/summaries/1402.json');
      break;
    case 1403:
      summaryFile = require('../assets/db/summaries/1403.json');
      break;
    case 1404:
      summaryFile = require('../assets/db/summaries/1404.json');
      break;
    case 1405:
      summaryFile = require('../assets/db/summaries/1405.json');
      break;
    case 1406:
      summaryFile = require('../assets/db/summaries/1406.json');
      break;
    case 1407:
      summaryFile = require('../assets/db/summaries/1407.json');
      break;
    case 1408:
      summaryFile = require('../assets/db/summaries/1408.json');
      break;
    case 1409:
      summaryFile = require('../assets/db/summaries/1409.json');
      break;
    case 1410:
      summaryFile = require('../assets/db/summaries/1410.json');
      break;
    case 1411:
      summaryFile = require('../assets/db/summaries/1411.json');
      break;
    case 1412:
      summaryFile = require('../assets/db/summaries/1412.json');
      break;
    case 1413:
      summaryFile = require('../assets/db/summaries/1413.json');
      break;
    case 1414:
      summaryFile = require('../assets/db/summaries/1414.json');
      break;
    case 1415:
      summaryFile = require('../assets/db/summaries/1415.json');
      break;
    case 1416:
      summaryFile = require('../assets/db/summaries/1416.json');
      break;
    case 1417:
      summaryFile = require('../assets/db/summaries/1417.json');
      break;
    case 1418:
      summaryFile = require('../assets/db/summaries/1418.json');
      break;
    case 1419:
      summaryFile = require('../assets/db/summaries/1419.json');
      break;
    case 1420:
      summaryFile = require('../assets/db/summaries/1420.json');
      break;
    case 1421:
      summaryFile = require('../assets/db/summaries/1421.json');
      break;
    case 1422:
      summaryFile = require('../assets/db/summaries/1422.json');
      break;
    case 1423:
      summaryFile = require('../assets/db/summaries/1423.json');
      break;
    case 1424:
      summaryFile = require('../assets/db/summaries/1424.json');
      break;
    case 1425:
      summaryFile = require('../assets/db/summaries/1425.json');
      break;
    case 1426:
      summaryFile = require('../assets/db/summaries/1426.json');
      break;
    case 1427:
      summaryFile = require('../assets/db/summaries/1427.json');
      break;
    case 1428:
      summaryFile = require('../assets/db/summaries/1428.json');
      break;
    case 1429:
      summaryFile = require('../assets/db/summaries/1429.json');
      break;
    case 1430:
      summaryFile = require('../assets/db/summaries/1430.json');
      break;
    case 1431:
      summaryFile = require('../assets/db/summaries/1431.json');
      break;
    case 1432:
      summaryFile = require('../assets/db/summaries/1432.json');
      break;
    case 1433:
      summaryFile = require('../assets/db/summaries/1433.json');
      break;
    case 1434:
      summaryFile = require('../assets/db/summaries/1434.json');
      break;
    case 1435:
      summaryFile = require('../assets/db/summaries/1435.json');
      break;
    case 1436:
      summaryFile = require('../assets/db/summaries/1436.json');
      break;
    case 1437:
      summaryFile = require('../assets/db/summaries/1437.json');
      break;
    case 1438:
      summaryFile = require('../assets/db/summaries/1438.json');
      break;
    case 1439:
      summaryFile = require('../assets/db/summaries/1439.json');
      break;
    case 1440:
      summaryFile = require('../assets/db/summaries/1440.json');
      break;
    case 1441:
      summaryFile = require('../assets/db/summaries/1441.json');
      break;
    case 1442:
      summaryFile = require('../assets/db/summaries/1442.json');
      break;
    case 1443:
      summaryFile = require('../assets/db/summaries/1443.json');
      break;
    case 1444:
      summaryFile = require('../assets/db/summaries/1444.json');
      break;
    case 1445:
      summaryFile = require('../assets/db/summaries/1445.json');
      break;
    case 1446:
      summaryFile = require('../assets/db/summaries/1446.json');
      break;
    case 1447:
      summaryFile = require('../assets/db/summaries/1447.json');
      break;
    case 1448:
      summaryFile = require('../assets/db/summaries/1448.json');
      break;
    case 1449:
      summaryFile = require('../assets/db/summaries/1449.json');
      break;
    case 1450:
      summaryFile = require('../assets/db/summaries/1450.json');
      break;
    case 1451:
      summaryFile = require('../assets/db/summaries/1451.json');
      break;
    case 1452:
      summaryFile = require('../assets/db/summaries/1452.json');
      break;
    case 1453:
      summaryFile = require('../assets/db/summaries/1453.json');
      break;
    case 1454:
      summaryFile = require('../assets/db/summaries/1454.json');
      break;
    case 1455:
      summaryFile = require('../assets/db/summaries/1455.json');
      break;
    case 1456:
      summaryFile = require('../assets/db/summaries/1456.json');
      break;
    case 1457:
      summaryFile = require('../assets/db/summaries/1457.json');
      break;
    case 1458:
      summaryFile = require('../assets/db/summaries/1458.json');
      break;
    case 1459:
      summaryFile = require('../assets/db/summaries/1459.json');
      break;
    case 1460:
      summaryFile = require('../assets/db/summaries/1460.json');
      break;
    case 1461:
      summaryFile = require('../assets/db/summaries/1461.json');
      break;
    case 1462:
      summaryFile = require('../assets/db/summaries/1462.json');
      break;
    case 1463:
      summaryFile = require('../assets/db/summaries/1463.json');
      break;
    case 1464:
      summaryFile = require('../assets/db/summaries/1464.json');
      break;
    case 1465:
      summaryFile = require('../assets/db/summaries/1465.json');
      break;
    case 1466:
      summaryFile = require('../assets/db/summaries/1466.json');
      break;
    case 1467:
      summaryFile = require('../assets/db/summaries/1467.json');
      break;
    case 1468:
      summaryFile = require('../assets/db/summaries/1468.json');
      break;
    case 1469:
      summaryFile = require('../assets/db/summaries/1469.json');
      break;
    case 1470:
      summaryFile = require('../assets/db/summaries/1470.json');
      break;
    case 1471:
      summaryFile = require('../assets/db/summaries/1471.json');
      break;
    case 1472:
      summaryFile = require('../assets/db/summaries/1472.json');
      break;
    case 1473:
      summaryFile = require('../assets/db/summaries/1473.json');
      break;
    case 1474:
      summaryFile = require('../assets/db/summaries/1474.json');
      break;
    case 1475:
      summaryFile = require('../assets/db/summaries/1475.json');
      break;
    case 1476:
      summaryFile = require('../assets/db/summaries/1476.json');
      break;
    case 1477:
      summaryFile = require('../assets/db/summaries/1477.json');
      break;
    case 1478:
      summaryFile = require('../assets/db/summaries/1478.json');
      break;
    case 1479:
      summaryFile = require('../assets/db/summaries/1479.json');
      break;
    case 1480:
      summaryFile = require('../assets/db/summaries/1480.json');
      break;
    case 1481:
      summaryFile = require('../assets/db/summaries/1481.json');
      break;
    case 1482:
      summaryFile = require('../assets/db/summaries/1482.json');
      break;
    case 1483:
      summaryFile = require('../assets/db/summaries/1483.json');
      break;
    case 1484:
      summaryFile = require('../assets/db/summaries/1484.json');
      break;
    case 1485:
      summaryFile = require('../assets/db/summaries/1485.json');
      break;
    case 1486:
      summaryFile = require('../assets/db/summaries/1486.json');
      break;
    case 1487:
      summaryFile = require('../assets/db/summaries/1487.json');
      break;
    case 1488:
      summaryFile = require('../assets/db/summaries/1488.json');
      break;
    case 1489:
      summaryFile = require('../assets/db/summaries/1489.json');
      break;
    case 1490:
      summaryFile = require('../assets/db/summaries/1490.json');
      break;
    case 1491:
      summaryFile = require('../assets/db/summaries/1491.json');
      break;
    case 1492:
      summaryFile = require('../assets/db/summaries/1492.json');
      break;
    case 1493:
      summaryFile = require('../assets/db/summaries/1493.json');
      break;
    case 1494:
      summaryFile = require('../assets/db/summaries/1494.json');
      break;
    case 1495:
      summaryFile = require('../assets/db/summaries/1495.json');
      break;
    case 1496:
      summaryFile = require('../assets/db/summaries/1496.json');
      break;
    case 1497:
      summaryFile = require('../assets/db/summaries/1497.json');
      break;
    case 1498:
      summaryFile = require('../assets/db/summaries/1498.json');
      break;
    case 1499:
      summaryFile = require('../assets/db/summaries/1499.json');
      break;
    case 1500:
      summaryFile = require('../assets/db/summaries/1500.json');
      break;
    case 1501:
      summaryFile = require('../assets/db/summaries/1501.json');
      break;
    case 1502:
      summaryFile = require('../assets/db/summaries/1502.json');
      break;
    case 1503:
      summaryFile = require('../assets/db/summaries/1503.json');
      break;
    case 1504:
      summaryFile = require('../assets/db/summaries/1504.json');
      break;
    case 1505:
      summaryFile = require('../assets/db/summaries/1505.json');
      break;
    case 1506:
      summaryFile = require('../assets/db/summaries/1506.json');
      break;
    case 1507:
      summaryFile = require('../assets/db/summaries/1507.json');
      break;
    case 1508:
      summaryFile = require('../assets/db/summaries/1508.json');
      break;
    case 1509:
      summaryFile = require('../assets/db/summaries/1509.json');
      break;
    case 1510:
      summaryFile = require('../assets/db/summaries/1510.json');
      break;
    case 1511:
      summaryFile = require('../assets/db/summaries/1511.json');
      break;
    case 1512:
      summaryFile = require('../assets/db/summaries/1512.json');
      break;
    case 1513:
      summaryFile = require('../assets/db/summaries/1513.json');
      break;
    case 1514:
      summaryFile = require('../assets/db/summaries/1514.json');
      break;
    case 1515:
      summaryFile = require('../assets/db/summaries/1515.json');
      break;
    case 1516:
      summaryFile = require('../assets/db/summaries/1516.json');
      break;
    case 1517:
      summaryFile = require('../assets/db/summaries/1517.json');
      break;
    case 1518:
      summaryFile = require('../assets/db/summaries/1518.json');
      break;
    case 1519:
      summaryFile = require('../assets/db/summaries/1519.json');
      break;
    case 1520:
      summaryFile = require('../assets/db/summaries/1520.json');
      break;
    case 1521:
      summaryFile = require('../assets/db/summaries/1521.json');
      break;
    case 1522:
      summaryFile = require('../assets/db/summaries/1522.json');
      break;
    case 1523:
      summaryFile = require('../assets/db/summaries/1523.json');
      break;
    case 1524:
      summaryFile = require('../assets/db/summaries/1524.json');
      break;
    case 1525:
      summaryFile = require('../assets/db/summaries/1525.json');
      break;
    case 1526:
      summaryFile = require('../assets/db/summaries/1526.json');
      break;
    case 1527:
      summaryFile = require('../assets/db/summaries/1527.json');
      break;
    case 1528:
      summaryFile = require('../assets/db/summaries/1528.json');
      break;
    case 1529:
      summaryFile = require('../assets/db/summaries/1529.json');
      break;
    case 1530:
      summaryFile = require('../assets/db/summaries/1530.json');
      break;
    case 1531:
      summaryFile = require('../assets/db/summaries/1531.json');
      break;
    case 1532:
      summaryFile = require('../assets/db/summaries/1532.json');
      break;
    case 1533:
      summaryFile = require('../assets/db/summaries/1533.json');
      break;
    case 1534:
      summaryFile = require('../assets/db/summaries/1534.json');
      break;
    case 1535:
      summaryFile = require('../assets/db/summaries/1535.json');
      break;
    case 1536:
      summaryFile = require('../assets/db/summaries/1536.json');
      break;
    case 1537:
      summaryFile = require('../assets/db/summaries/1537.json');
      break;
    case 1538:
      summaryFile = require('../assets/db/summaries/1538.json');
      break;
    case 1539:
      summaryFile = require('../assets/db/summaries/1539.json');
      break;
    case 1540:
      summaryFile = require('../assets/db/summaries/1540.json');
      break;
    case 1541:
      summaryFile = require('../assets/db/summaries/1541.json');
      break;
    case 1542:
      summaryFile = require('../assets/db/summaries/1542.json');
      break;
    case 1543:
      summaryFile = require('../assets/db/summaries/1543.json');
      break;
    case 1544:
      summaryFile = require('../assets/db/summaries/1544.json');
      break;
    case 1545:
      summaryFile = require('../assets/db/summaries/1545.json');
      break;
    case 1546:
      summaryFile = require('../assets/db/summaries/1546.json');
      break;
    case 1547:
      summaryFile = require('../assets/db/summaries/1547.json');
      break;
    case 1548:
      summaryFile = require('../assets/db/summaries/1548.json');
      break;
    case 1549:
      summaryFile = require('../assets/db/summaries/1549.json');
      break;
    case 1550:
      summaryFile = require('../assets/db/summaries/1550.json');
      break;
    case 1551:
      summaryFile = require('../assets/db/summaries/1551.json');
      break;
    case 1552:
      summaryFile = require('../assets/db/summaries/1552.json');
      break;
    case 1553:
      summaryFile = require('../assets/db/summaries/1553.json');
      break;
    case 1554:
      summaryFile = require('../assets/db/summaries/1554.json');
      break;
    case 1555:
      summaryFile = require('../assets/db/summaries/1555.json');
      break;
    case 1556:
      summaryFile = require('../assets/db/summaries/1556.json');
      break;
    case 1557:
      summaryFile = require('../assets/db/summaries/1557.json');
      break;
    case 1558:
      summaryFile = require('../assets/db/summaries/1558.json');
      break;
    case 1559:
      summaryFile = require('../assets/db/summaries/1559.json');
      break;
    case 1560:
      summaryFile = require('../assets/db/summaries/1560.json');
      break;
    case 1561:
      summaryFile = require('../assets/db/summaries/1561.json');
      break;
    case 1562:
      summaryFile = require('../assets/db/summaries/1562.json');
      break;
    case 1563:
      summaryFile = require('../assets/db/summaries/1563.json');
      break;
    case 1564:
      summaryFile = require('../assets/db/summaries/1564.json');
      break;
    case 1565:
      summaryFile = require('../assets/db/summaries/1565.json');
      break;
    case 1566:
      summaryFile = require('../assets/db/summaries/1566.json');
      break;
    case 1567:
      summaryFile = require('../assets/db/summaries/1567.json');
      break;
    case 1568:
      summaryFile = require('../assets/db/summaries/1568.json');
      break;
    case 1569:
      summaryFile = require('../assets/db/summaries/1569.json');
      break;
    case 1570:
      summaryFile = require('../assets/db/summaries/1570.json');
      break;
    case 1571:
      summaryFile = require('../assets/db/summaries/1571.json');
      break;
    case 1572:
      summaryFile = require('../assets/db/summaries/1572.json');
      break;
    case 1573:
      summaryFile = require('../assets/db/summaries/1573.json');
      break;
    case 1574:
      summaryFile = require('../assets/db/summaries/1574.json');
      break;
    case 1575:
      summaryFile = require('../assets/db/summaries/1575.json');
      break;
    case 1576:
      summaryFile = require('../assets/db/summaries/1576.json');
      break;
    case 1577:
      summaryFile = require('../assets/db/summaries/1577.json');
      break;
    case 1578:
      summaryFile = require('../assets/db/summaries/1578.json');
      break;
    case 1579:
      summaryFile = require('../assets/db/summaries/1579.json');
      break;
    case 1580:
      summaryFile = require('../assets/db/summaries/1580.json');
      break;
    case 1581:
      summaryFile = require('../assets/db/summaries/1581.json');
      break;
    case 1582:
      summaryFile = require('../assets/db/summaries/1582.json');
      break;
    case 1583:
      summaryFile = require('../assets/db/summaries/1583.json');
      break;
    case 1584:
      summaryFile = require('../assets/db/summaries/1584.json');
      break;
    case 1585:
      summaryFile = require('../assets/db/summaries/1585.json');
      break;
    case 1586:
      summaryFile = require('../assets/db/summaries/1586.json');
      break;
    case 1587:
      summaryFile = require('../assets/db/summaries/1587.json');
      break;
    case 1588:
      summaryFile = require('../assets/db/summaries/1588.json');
      break;
    case 1589:
      summaryFile = require('../assets/db/summaries/1589.json');
      break;
    case 1590:
      summaryFile = require('../assets/db/summaries/1590.json');
      break;
    case 1591:
      summaryFile = require('../assets/db/summaries/1591.json');
      break;
    case 1592:
      summaryFile = require('../assets/db/summaries/1592.json');
      break;
    case 1593:
      summaryFile = require('../assets/db/summaries/1593.json');
      break;
    case 1594:
      summaryFile = require('../assets/db/summaries/1594.json');
      break;
    case 1595:
      summaryFile = require('../assets/db/summaries/1595.json');
      break;
    case 1596:
      summaryFile = require('../assets/db/summaries/1596.json');
      break;
    case 1597:
      summaryFile = require('../assets/db/summaries/1597.json');
      break;
    case 1598:
      summaryFile = require('../assets/db/summaries/1598.json');
      break;
    case 1599:
      summaryFile = require('../assets/db/summaries/1599.json');
      break;
    case 1600:
      summaryFile = require('../assets/db/summaries/1600.json');
      break;
    case 1601:
      summaryFile = require('../assets/db/summaries/1601.json');
      break;
    case 1602:
      summaryFile = require('../assets/db/summaries/1602.json');
      break;
    case 1603:
      summaryFile = require('../assets/db/summaries/1603.json');
      break;
    case 1604:
      summaryFile = require('../assets/db/summaries/1604.json');
      break;
    case 1605:
      summaryFile = require('../assets/db/summaries/1605.json');
      break;
    case 1606:
      summaryFile = require('../assets/db/summaries/1606.json');
      break;
    case 1607:
      summaryFile = require('../assets/db/summaries/1607.json');
      break;
    case 1608:
      summaryFile = require('../assets/db/summaries/1608.json');
      break;
    case 1609:
      summaryFile = require('../assets/db/summaries/1609.json');
      break;
    case 1610:
      summaryFile = require('../assets/db/summaries/1610.json');
      break;
    case 1611:
      summaryFile = require('../assets/db/summaries/1611.json');
      break;
    case 1612:
      summaryFile = require('../assets/db/summaries/1612.json');
      break;
    case 1613:
      summaryFile = require('../assets/db/summaries/1613.json');
      break;
    case 1614:
      summaryFile = require('../assets/db/summaries/1614.json');
      break;
    case 1615:
      summaryFile = require('../assets/db/summaries/1615.json');
      break;
    case 1616:
      summaryFile = require('../assets/db/summaries/1616.json');
      break;
    case 1617:
      summaryFile = require('../assets/db/summaries/1617.json');
      break;
    case 1618:
      summaryFile = require('../assets/db/summaries/1618.json');
      break;
    case 1619:
      summaryFile = require('../assets/db/summaries/1619.json');
      break;
    case 1620:
      summaryFile = require('../assets/db/summaries/1620.json');
      break;
    case 1621:
      summaryFile = require('../assets/db/summaries/1621.json');
      break;
    case 1622:
      summaryFile = require('../assets/db/summaries/1622.json');
      break;
    case 1623:
      summaryFile = require('../assets/db/summaries/1623.json');
      break;
    case 1624:
      summaryFile = require('../assets/db/summaries/1624.json');
      break;
    case 1625:
      summaryFile = require('../assets/db/summaries/1625.json');
      break;
    case 1626:
      summaryFile = require('../assets/db/summaries/1626.json');
      break;
    case 1627:
      summaryFile = require('../assets/db/summaries/1627.json');
      break;
    case 1628:
      summaryFile = require('../assets/db/summaries/1628.json');
      break;
    case 1629:
      summaryFile = require('../assets/db/summaries/1629.json');
      break;
    case 1630:
      summaryFile = require('../assets/db/summaries/1630.json');
      break;
    case 1631:
      summaryFile = require('../assets/db/summaries/1631.json');
      break;
    case 1632:
      summaryFile = require('../assets/db/summaries/1632.json');
      break;
    case 1633:
      summaryFile = require('../assets/db/summaries/1633.json');
      break;
    case 1634:
      summaryFile = require('../assets/db/summaries/1634.json');
      break;
    case 1635:
      summaryFile = require('../assets/db/summaries/1635.json');
      break;
    case 1636:
      summaryFile = require('../assets/db/summaries/1636.json');
      break;
    case 1637:
      summaryFile = require('../assets/db/summaries/1637.json');
      break;
    case 1638:
      summaryFile = require('../assets/db/summaries/1638.json');
      break;
    case 1639:
      summaryFile = require('../assets/db/summaries/1639.json');
      break;
    case 1640:
      summaryFile = require('../assets/db/summaries/1640.json');
      break;
    case 1641:
      summaryFile = require('../assets/db/summaries/1641.json');
      break;
    case 1642:
      summaryFile = require('../assets/db/summaries/1642.json');
      break;
    case 1643:
      summaryFile = require('../assets/db/summaries/1643.json');
      break;
    case 1644:
      summaryFile = require('../assets/db/summaries/1644.json');
      break;
    case 1645:
      summaryFile = require('../assets/db/summaries/1645.json');
      break;
    case 1646:
      summaryFile = require('../assets/db/summaries/1646.json');
      break;
    case 1647:
      summaryFile = require('../assets/db/summaries/1647.json');
      break;
    case 1648:
      summaryFile = require('../assets/db/summaries/1648.json');
      break;
    case 1649:
      summaryFile = require('../assets/db/summaries/1649.json');
      break;
    case 1650:
      summaryFile = require('../assets/db/summaries/1650.json');
      break;
    case 1651:
      summaryFile = require('../assets/db/summaries/1651.json');
      break;
    case 1652:
      summaryFile = require('../assets/db/summaries/1652.json');
      break;
    case 1653:
      summaryFile = require('../assets/db/summaries/1653.json');
      break;
    case 1654:
      summaryFile = require('../assets/db/summaries/1654.json');
      break;
    case 1655:
      summaryFile = require('../assets/db/summaries/1655.json');
      break;
    case 1656:
      summaryFile = require('../assets/db/summaries/1656.json');
      break;
    case 1657:
      summaryFile = require('../assets/db/summaries/1657.json');
      break;
    case 1658:
      summaryFile = require('../assets/db/summaries/1658.json');
      break;
    case 1659:
      summaryFile = require('../assets/db/summaries/1659.json');
      break;
    case 1660:
      summaryFile = require('../assets/db/summaries/1660.json');
      break;
    case 1661:
      summaryFile = require('../assets/db/summaries/1661.json');
      break;
    case 1662:
      summaryFile = require('../assets/db/summaries/1662.json');
      break;
    case 1663:
      summaryFile = require('../assets/db/summaries/1663.json');
      break;
    case 1664:
      summaryFile = require('../assets/db/summaries/1664.json');
      break;
    case 1665:
      summaryFile = require('../assets/db/summaries/1665.json');
      break;
    case 1666:
      summaryFile = require('../assets/db/summaries/1666.json');
      break;
    case 1667:
      summaryFile = require('../assets/db/summaries/1667.json');
      break;
    case 1668:
      summaryFile = require('../assets/db/summaries/1668.json');
      break;
    case 1669:
      summaryFile = require('../assets/db/summaries/1669.json');
      break;
    case 1670:
      summaryFile = require('../assets/db/summaries/1670.json');
      break;
    case 1671:
      summaryFile = require('../assets/db/summaries/1671.json');
      break;
    case 1672:
      summaryFile = require('../assets/db/summaries/1672.json');
      break;
    case 1673:
      summaryFile = require('../assets/db/summaries/1673.json');
      break;
    case 1674:
      summaryFile = require('../assets/db/summaries/1674.json');
      break;
    case 1675:
      summaryFile = require('../assets/db/summaries/1675.json');
      break;
    case 1676:
      summaryFile = require('../assets/db/summaries/1676.json');
      break;
    case 1677:
      summaryFile = require('../assets/db/summaries/1677.json');
      break;
    case 1678:
      summaryFile = require('../assets/db/summaries/1678.json');
      break;
    case 1679:
      summaryFile = require('../assets/db/summaries/1679.json');
      break;
    case 1680:
      summaryFile = require('../assets/db/summaries/1680.json');
      break;
    case 1681:
      summaryFile = require('../assets/db/summaries/1681.json');
      break;
    case 1682:
      summaryFile = require('../assets/db/summaries/1682.json');
      break;
    case 1683:
      summaryFile = require('../assets/db/summaries/1683.json');
      break;
    case 1684:
      summaryFile = require('../assets/db/summaries/1684.json');
      break;
    case 1685:
      summaryFile = require('../assets/db/summaries/1685.json');
      break;
    case 1686:
      summaryFile = require('../assets/db/summaries/1686.json');
      break;
    case 1687:
      summaryFile = require('../assets/db/summaries/1687.json');
      break;
    case 1688:
      summaryFile = require('../assets/db/summaries/1688.json');
      break;
    case 1689:
      summaryFile = require('../assets/db/summaries/1689.json');
      break;
    case 1690:
      summaryFile = require('../assets/db/summaries/1690.json');
      break;
    case 1691:
      summaryFile = require('../assets/db/summaries/1691.json');
      break;
    case 1692:
      summaryFile = require('../assets/db/summaries/1692.json');
      break;
    case 1693:
      summaryFile = require('../assets/db/summaries/1693.json');
      break;
    case 1694:
      summaryFile = require('../assets/db/summaries/1694.json');
      break;
    case 1695:
      summaryFile = require('../assets/db/summaries/1695.json');
      break;
    case 1696:
      summaryFile = require('../assets/db/summaries/1696.json');
      break;
    case 1697:
      summaryFile = require('../assets/db/summaries/1697.json');
      break;
    case 1698:
      summaryFile = require('../assets/db/summaries/1698.json');
      break;
    case 1699:
      summaryFile = require('../assets/db/summaries/1699.json');
      break;
    case 1700:
      summaryFile = require('../assets/db/summaries/1700.json');
      break;
    case 1701:
      summaryFile = require('../assets/db/summaries/1701.json');
      break;
    case 1702:
      summaryFile = require('../assets/db/summaries/1702.json');
      break;
    case 1703:
      summaryFile = require('../assets/db/summaries/1703.json');
      break;
    case 1704:
      summaryFile = require('../assets/db/summaries/1704.json');
      break;
    case 1705:
      summaryFile = require('../assets/db/summaries/1705.json');
      break;
    case 1706:
      summaryFile = require('../assets/db/summaries/1706.json');
      break;
    case 1707:
      summaryFile = require('../assets/db/summaries/1707.json');
      break;
    case 1708:
      summaryFile = require('../assets/db/summaries/1708.json');
      break;
    case 1709:
      summaryFile = require('../assets/db/summaries/1709.json');
      break;
    case 1710:
      summaryFile = require('../assets/db/summaries/1710.json');
      break;
    case 1711:
      summaryFile = require('../assets/db/summaries/1711.json');
      break;
    case 1712:
      summaryFile = require('../assets/db/summaries/1712.json');
      break;
    case 1713:
      summaryFile = require('../assets/db/summaries/1713.json');
      break;
    case 1714:
      summaryFile = require('../assets/db/summaries/1714.json');
      break;
    case 1715:
      summaryFile = require('../assets/db/summaries/1715.json');
      break;
    case 1716:
      summaryFile = require('../assets/db/summaries/1716.json');
      break;
    case 1717:
      summaryFile = require('../assets/db/summaries/1717.json');
      break;
    case 1718:
      summaryFile = require('../assets/db/summaries/1718.json');
      break;
    case 1719:
      summaryFile = require('../assets/db/summaries/1719.json');
      break;
    case 1720:
      summaryFile = require('../assets/db/summaries/1720.json');
      break;
    case 1721:
      summaryFile = require('../assets/db/summaries/1721.json');
      break;
    case 1722:
      summaryFile = require('../assets/db/summaries/1722.json');
      break;
    case 1723:
      summaryFile = require('../assets/db/summaries/1723.json');
      break;
    case 1724:
      summaryFile = require('../assets/db/summaries/1724.json');
      break;
    case 1725:
      summaryFile = require('../assets/db/summaries/1725.json');
      break;
    case 1726:
      summaryFile = require('../assets/db/summaries/1726.json');
      break;
    case 1727:
      summaryFile = require('../assets/db/summaries/1727.json');
      break;
    case 1728:
      summaryFile = require('../assets/db/summaries/1728.json');
      break;
    case 1729:
      summaryFile = require('../assets/db/summaries/1729.json');
      break;
    case 1730:
      summaryFile = require('../assets/db/summaries/1730.json');
      break;
    case 1731:
      summaryFile = require('../assets/db/summaries/1731.json');
      break;
    case 1732:
      summaryFile = require('../assets/db/summaries/1732.json');
      break;
    case 1733:
      summaryFile = require('../assets/db/summaries/1733.json');
      break;
    case 1734:
      summaryFile = require('../assets/db/summaries/1734.json');
      break;
    case 1735:
      summaryFile = require('../assets/db/summaries/1735.json');
      break;
    case 1736:
      summaryFile = require('../assets/db/summaries/1736.json');
      break;
    case 1737:
      summaryFile = require('../assets/db/summaries/1737.json');
      break;
    case 1738:
      summaryFile = require('../assets/db/summaries/1738.json');
      break;
    case 1739:
      summaryFile = require('../assets/db/summaries/1739.json');
      break;
    case 1740:
      summaryFile = require('../assets/db/summaries/1740.json');
      break;
    case 1741:
      summaryFile = require('../assets/db/summaries/1741.json');
      break;
    case 1742:
      summaryFile = require('../assets/db/summaries/1742.json');
      break;
    case 1743:
      summaryFile = require('../assets/db/summaries/1743.json');
      break;
    case 1744:
      summaryFile = require('../assets/db/summaries/1744.json');
      break;
    case 1745:
      summaryFile = require('../assets/db/summaries/1745.json');
      break;
    case 1746:
      summaryFile = require('../assets/db/summaries/1746.json');
      break;
    case 1747:
      summaryFile = require('../assets/db/summaries/1747.json');
      break;
    case 1748:
      summaryFile = require('../assets/db/summaries/1748.json');
      break;
    case 1750:
      summaryFile = require('../assets/db/summaries/1750.json');
      break;
    case 1751:
      summaryFile = require('../assets/db/summaries/1751.json');
      break;
    case 1752:
      summaryFile = require('../assets/db/summaries/1752.json');
      break;
    case 1753:
      summaryFile = require('../assets/db/summaries/1753.json');
      break;
    case 1754:
      summaryFile = require('../assets/db/summaries/1754.json');
      break;
    case 1755:
      summaryFile = require('../assets/db/summaries/1755.json');
      break;
    case 1756:
      summaryFile = require('../assets/db/summaries/1756.json');
      break;
    case 1757:
      summaryFile = require('../assets/db/summaries/1757.json');
      break;
    case 1758:
      summaryFile = require('../assets/db/summaries/1758.json');
      break;
    case 1759:
      summaryFile = require('../assets/db/summaries/1759.json');
      break;
    case 1760:
      summaryFile = require('../assets/db/summaries/1760.json');
      break;
    case 1761:
      summaryFile = require('../assets/db/summaries/1761.json');
      break;
    case 1762:
      summaryFile = require('../assets/db/summaries/1762.json');
      break;
    case 1763:
      summaryFile = require('../assets/db/summaries/1763.json');
      break;
    case 1764:
      summaryFile = require('../assets/db/summaries/1764.json');
      break;
    case 1765:
      summaryFile = require('../assets/db/summaries/1765.json');
      break;
    case 1766:
      summaryFile = require('../assets/db/summaries/1766.json');
      break;
    case 1767:
      summaryFile = require('../assets/db/summaries/1767.json');
      break;
    case 1768:
      summaryFile = require('../assets/db/summaries/1768.json');
      break;
    case 1769:
      summaryFile = require('../assets/db/summaries/1769.json');
      break;
    case 1770:
      summaryFile = require('../assets/db/summaries/1770.json');
      break;
    case 1771:
      summaryFile = require('../assets/db/summaries/1771.json');
      break;
    case 1772:
      summaryFile = require('../assets/db/summaries/1772.json');
      break;
    case 1773:
      summaryFile = require('../assets/db/summaries/1773.json');
      break;
    case 1774:
      summaryFile = require('../assets/db/summaries/1774.json');
      break;
    case 1775:
      summaryFile = require('../assets/db/summaries/1775.json');
      break;
    case 1776:
      summaryFile = require('../assets/db/summaries/1776.json');
      break;
    case 1777:
      summaryFile = require('../assets/db/summaries/1777.json');
      break;
    case 1778:
      summaryFile = require('../assets/db/summaries/1778.json');
      break;
    case 1779:
      summaryFile = require('../assets/db/summaries/1779.json');
      break;
    case 1780:
      summaryFile = require('../assets/db/summaries/1780.json');
      break;
    case 1781:
      summaryFile = require('../assets/db/summaries/1781.json');
      break;
    case 1782:
      summaryFile = require('../assets/db/summaries/1782.json');
      break;
    case 1783:
      summaryFile = require('../assets/db/summaries/1783.json');
      break;
    case 1784:
      summaryFile = require('../assets/db/summaries/1784.json');
      break;
    case 1785:
      summaryFile = require('../assets/db/summaries/1785.json');
      break;
    case 1786:
      summaryFile = require('../assets/db/summaries/1786.json');
      break;
    case 1787:
      summaryFile = require('../assets/db/summaries/1787.json');
      break;
    case 1788:
      summaryFile = require('../assets/db/summaries/1788.json');
      break;
    case 1789:
      summaryFile = require('../assets/db/summaries/1789.json');
      break;
    case 1790:
      summaryFile = require('../assets/db/summaries/1790.json');
      break;
    case 1791:
      summaryFile = require('../assets/db/summaries/1791.json');
      break;
    case 1792:
      summaryFile = require('../assets/db/summaries/1792.json');
      break;
    case 1793:
      summaryFile = require('../assets/db/summaries/1793.json');
      break;
    case 1794:
      summaryFile = require('../assets/db/summaries/1794.json');
      break;
    case 1795:
      summaryFile = require('../assets/db/summaries/1795.json');
      break;
    case 1796:
      summaryFile = require('../assets/db/summaries/1796.json');
      break;
    case 1797:
      summaryFile = require('../assets/db/summaries/1797.json');
      break;
    case 1798:
      summaryFile = require('../assets/db/summaries/1798.json');
      break;
    case 1799:
      summaryFile = require('../assets/db/summaries/1799.json');
      break;
    case 1800:
      summaryFile = require('../assets/db/summaries/1800.json');
      break;
    case 1801:
      summaryFile = require('../assets/db/summaries/1801.json');
      break;
    case 1802:
      summaryFile = require('../assets/db/summaries/1802.json');
      break;
    case 1803:
      summaryFile = require('../assets/db/summaries/1803.json');
      break;
    case 1804:
      summaryFile = require('../assets/db/summaries/1804.json');
      break;
    case 1805:
      summaryFile = require('../assets/db/summaries/1805.json');
      break;
    case 1806:
      summaryFile = require('../assets/db/summaries/1806.json');
      break;
    case 1807:
      summaryFile = require('../assets/db/summaries/1807.json');
      break;
    case 1808:
      summaryFile = require('../assets/db/summaries/1808.json');
      break;
    case 1809:
      summaryFile = require('../assets/db/summaries/1809.json');
      break;
    case 1810:
      summaryFile = require('../assets/db/summaries/1810.json');
      break;
    case 1811:
      summaryFile = require('../assets/db/summaries/1811.json');
      break;
    case 1812:
      summaryFile = require('../assets/db/summaries/1812.json');
      break;
    case 1813:
      summaryFile = require('../assets/db/summaries/1813.json');
      break;
    case 1814:
      summaryFile = require('../assets/db/summaries/1814.json');
      break;
    case 1815:
      summaryFile = require('../assets/db/summaries/1815.json');
      break;
    case 1816:
      summaryFile = require('../assets/db/summaries/1816.json');
      break;
    case 1817:
      summaryFile = require('../assets/db/summaries/1817.json');
      break;
    case 1818:
      summaryFile = require('../assets/db/summaries/1818.json');
      break;
    case 1819:
      summaryFile = require('../assets/db/summaries/1819.json');
      break;
    case 1820:
      summaryFile = require('../assets/db/summaries/1820.json');
      break;
    case 1821:
      summaryFile = require('../assets/db/summaries/1821.json');
      break;
    case 1822:
      summaryFile = require('../assets/db/summaries/1822.json');
      break;
    case 1823:
      summaryFile = require('../assets/db/summaries/1823.json');
      break;
    case 1824:
      summaryFile = require('../assets/db/summaries/1824.json');
      break;
    case 1825:
      summaryFile = require('../assets/db/summaries/1825.json');
      break;
    case 1826:
      summaryFile = require('../assets/db/summaries/1826.json');
      break;
    case 1827:
      summaryFile = require('../assets/db/summaries/1827.json');
      break;
    case 1828:
      summaryFile = require('../assets/db/summaries/1828.json');
      break;
    case 1829:
      summaryFile = require('../assets/db/summaries/1829.json');
      break;
    case 1830:
      summaryFile = require('../assets/db/summaries/1830.json');
      break;
    case 1831:
      summaryFile = require('../assets/db/summaries/1831.json');
      break;
    case 1832:
      summaryFile = require('../assets/db/summaries/1832.json');
      break;
    case 1833:
      summaryFile = require('../assets/db/summaries/1833.json');
      break;
    case 1834:
      summaryFile = require('../assets/db/summaries/1834.json');
      break;
    case 1835:
      summaryFile = require('../assets/db/summaries/1835.json');
      break;
    case 1836:
      summaryFile = require('../assets/db/summaries/1836.json');
      break;
    case 1837:
      summaryFile = require('../assets/db/summaries/1837.json');
      break;
    case 1838:
      summaryFile = require('../assets/db/summaries/1838.json');
      break;
    case 1839:
      summaryFile = require('../assets/db/summaries/1839.json');
      break;
    case 1840:
      summaryFile = require('../assets/db/summaries/1840.json');
      break;
    case 1841:
      summaryFile = require('../assets/db/summaries/1841.json');
      break;
    case 1842:
      summaryFile = require('../assets/db/summaries/1842.json');
      break;
    case 1843:
      summaryFile = require('../assets/db/summaries/1843.json');
      break;
    case 1844:
      summaryFile = require('../assets/db/summaries/1844.json');
      break;
    case 1845:
      summaryFile = require('../assets/db/summaries/1845.json');
      break;
    case 1846:
      summaryFile = require('../assets/db/summaries/1846.json');
      break;
    case 1847:
      summaryFile = require('../assets/db/summaries/1847.json');
      break;
    case 1848:
      summaryFile = require('../assets/db/summaries/1848.json');
      break;
    case 1849:
      summaryFile = require('../assets/db/summaries/1849.json');
      break;
    case 1850:
      summaryFile = require('../assets/db/summaries/1850.json');
      break;
    case 1851:
      summaryFile = require('../assets/db/summaries/1851.json');
      break;
    case 1852:
      summaryFile = require('../assets/db/summaries/1852.json');
      break;
    case 1853:
      summaryFile = require('../assets/db/summaries/1853.json');
      break;
    case 1854:
      summaryFile = require('../assets/db/summaries/1854.json');
      break;
    case 1855:
      summaryFile = require('../assets/db/summaries/1855.json');
      break;
    case 1856:
      summaryFile = require('../assets/db/summaries/1856.json');
      break;
    case 1857:
      summaryFile = require('../assets/db/summaries/1857.json');
      break;
    case 1858:
      summaryFile = require('../assets/db/summaries/1858.json');
      break;
    case 1859:
      summaryFile = require('../assets/db/summaries/1859.json');
      break;
    case 1860:
      summaryFile = require('../assets/db/summaries/1860.json');
      break;
    case 1861:
      summaryFile = require('../assets/db/summaries/1861.json');
      break;
    case 1862:
      summaryFile = require('../assets/db/summaries/1862.json');
      break;
    case 1863:
      summaryFile = require('../assets/db/summaries/1863.json');
      break;
    case 1864:
      summaryFile = require('../assets/db/summaries/1864.json');
      break;
    case 1865:
      summaryFile = require('../assets/db/summaries/1865.json');
      break;
    case 1866:
      summaryFile = require('../assets/db/summaries/1866.json');
      break;
    case 1867:
      summaryFile = require('../assets/db/summaries/1867.json');
      break;
    case 1868:
      summaryFile = require('../assets/db/summaries/1868.json');
      break;
    case 1869:
      summaryFile = require('../assets/db/summaries/1869.json');
      break;
    case 1870:
      summaryFile = require('../assets/db/summaries/1870.json');
      break;
    case 1871:
      summaryFile = require('../assets/db/summaries/1871.json');
      break;
    case 1872:
      summaryFile = require('../assets/db/summaries/1872.json');
      break;
    case 1873:
      summaryFile = require('../assets/db/summaries/1873.json');
      break;
    case 1874:
      summaryFile = require('../assets/db/summaries/1874.json');
      break;
    case 1875:
      summaryFile = require('../assets/db/summaries/1875.json');
      break;
    case 1876:
      summaryFile = require('../assets/db/summaries/1876.json');
      break;
    case 1877:
      summaryFile = require('../assets/db/summaries/1877.json');
      break;
    case 1878:
      summaryFile = require('../assets/db/summaries/1878.json');
      break;
    case 1879:
      summaryFile = require('../assets/db/summaries/1879.json');
      break;
    case 1880:
      summaryFile = require('../assets/db/summaries/1880.json');
      break;
    case 1881:
      summaryFile = require('../assets/db/summaries/1881.json');
      break;
    case 1882:
      summaryFile = require('../assets/db/summaries/1882.json');
      break;
    case 1883:
      summaryFile = require('../assets/db/summaries/1883.json');
      break;
    case 1884:
      summaryFile = require('../assets/db/summaries/1884.json');
      break;
    case 1885:
      summaryFile = require('../assets/db/summaries/1885.json');
      break;
    case 1886:
      summaryFile = require('../assets/db/summaries/1886.json');
      break;
    case 1887:
      summaryFile = require('../assets/db/summaries/1887.json');
      break;
    case 1888:
      summaryFile = require('../assets/db/summaries/1888.json');
      break;
    case 1889:
      summaryFile = require('../assets/db/summaries/1889.json');
      break;
    case 1890:
      summaryFile = require('../assets/db/summaries/1890.json');
      break;
    case 1891:
      summaryFile = require('../assets/db/summaries/1891.json');
      break;
    case 1892:
      summaryFile = require('../assets/db/summaries/1892.json');
      break;
    case 1893:
      summaryFile = require('../assets/db/summaries/1893.json');
      break;
    case 1894:
      summaryFile = require('../assets/db/summaries/1894.json');
      break;
    case 1895:
      summaryFile = require('../assets/db/summaries/1895.json');
      break;
    case 1896:
      summaryFile = require('../assets/db/summaries/1896.json');
      break;
    case 1897:
      summaryFile = require('../assets/db/summaries/1897.json');
      break;
    case 1898:
      summaryFile = require('../assets/db/summaries/1898.json');
      break;
    case 1899:
      summaryFile = require('../assets/db/summaries/1899.json');
      break;
    case 1900:
      summaryFile = require('../assets/db/summaries/1900.json');
      break;
    case 1901:
      summaryFile = require('../assets/db/summaries/1901.json');
      break;
    case 1902:
      summaryFile = require('../assets/db/summaries/1902.json');
      break;
    case 1903:
      summaryFile = require('../assets/db/summaries/1903.json');
      break;
    case 1904:
      summaryFile = require('../assets/db/summaries/1904.json');
      break;
    case 1905:
      summaryFile = require('../assets/db/summaries/1905.json');
      break;
    case 1906:
      summaryFile = require('../assets/db/summaries/1906.json');
      break;
    case 1907:
      summaryFile = require('../assets/db/summaries/1907.json');
      break;
    case 1908:
      summaryFile = require('../assets/db/summaries/1908.json');
      break;
    case 1909:
      summaryFile = require('../assets/db/summaries/1909.json');
      break;
    case 1910:
      summaryFile = require('../assets/db/summaries/1910.json');
      break;
    case 1911:
      summaryFile = require('../assets/db/summaries/1911.json');
      break;
    case 1912:
      summaryFile = require('../assets/db/summaries/1912.json');
      break;
    case 1913:
      summaryFile = require('../assets/db/summaries/1913.json');
      break;
    case 1914:
      summaryFile = require('../assets/db/summaries/1914.json');
      break;
    case 1915:
      summaryFile = require('../assets/db/summaries/1915.json');
      break;
    case 1916:
      summaryFile = require('../assets/db/summaries/1916.json');
      break;
    case 1917:
      summaryFile = require('../assets/db/summaries/1917.json');
      break;
    case 1918:
      summaryFile = require('../assets/db/summaries/1918.json');
      break;
    case 1919:
      summaryFile = require('../assets/db/summaries/1919.json');
      break;
    case 1920:
      summaryFile = require('../assets/db/summaries/1920.json');
      break;
    case 1921:
      summaryFile = require('../assets/db/summaries/1921.json');
      break;
    case 1922:
      summaryFile = require('../assets/db/summaries/1922.json');
      break;
    case 1923:
      summaryFile = require('../assets/db/summaries/1923.json');
      break;
    case 1924:
      summaryFile = require('../assets/db/summaries/1924.json');
      break;
    case 1925:
      summaryFile = require('../assets/db/summaries/1925.json');
      break;
    case 1926:
      summaryFile = require('../assets/db/summaries/1926.json');
      break;
    case 1927:
      summaryFile = require('../assets/db/summaries/1927.json');
      break;
    case 1928:
      summaryFile = require('../assets/db/summaries/1928.json');
      break;
    case 1929:
      summaryFile = require('../assets/db/summaries/1929.json');
      break;
    case 1930:
      summaryFile = require('../assets/db/summaries/1930.json');
      break;
    case 1931:
      summaryFile = require('../assets/db/summaries/1931.json');
      break;
    case 1932:
      summaryFile = require('../assets/db/summaries/1932.json');
      break;
    case 1933:
      summaryFile = require('../assets/db/summaries/1933.json');
      break;
    case 1934:
      summaryFile = require('../assets/db/summaries/1934.json');
      break;
    case 1935:
      summaryFile = require('../assets/db/summaries/1935.json');
      break;
    case 1936:
      summaryFile = require('../assets/db/summaries/1936.json');
      break;
    case 1937:
      summaryFile = require('../assets/db/summaries/1937.json');
      break;
    case 1938:
      summaryFile = require('../assets/db/summaries/1938.json');
      break;
    case 1939:
      summaryFile = require('../assets/db/summaries/1939.json');
      break;
    case 1940:
      summaryFile = require('../assets/db/summaries/1940.json');
      break;
    case 52170:
      summaryFile = require('../assets/db/summaries/52170.json');
      break;
    case 52171:
      summaryFile = require('../assets/db/summaries/52171.json');
      break;
    case 52172:
      summaryFile = require('../assets/db/summaries/52172.json');
      break;
    case 52173:
      summaryFile = require('../assets/db/summaries/52173.json');
      break;
    case 52174:
      summaryFile = require('../assets/db/summaries/52174.json');
      break;
    case 52175:
      summaryFile = require('../assets/db/summaries/52175.json');
      break;
    case 52176:
      summaryFile = require('../assets/db/summaries/52176.json');
      break;
    case 52177:
      summaryFile = require('../assets/db/summaries/52177.json');
      break;
    case 68016:
      summaryFile = require('../assets/db/summaries/68016.json');
      break;
    case 87954:
      summaryFile = require('../assets/db/summaries/87954.json');
      break;
    case 87955:
      summaryFile = require('../assets/db/summaries/87955.json');
      break;
    case 87956:
      summaryFile = require('../assets/db/summaries/87956.json');
      break;
    case 87957:
      summaryFile = require('../assets/db/summaries/87957.json');
      break;
    case 87958:
      summaryFile = require('../assets/db/summaries/87958.json');
      break;
    case 87959:
      summaryFile = require('../assets/db/summaries/87959.json');
      break;
    case 87960:
      summaryFile = require('../assets/db/summaries/87960.json');
      break;
    case 87961:
      summaryFile = require('../assets/db/summaries/87961.json');
      break;
    case 87962:
      summaryFile = require('../assets/db/summaries/87962.json');
      break;
    case 87963:
      summaryFile = require('../assets/db/summaries/87963.json');
      break;
    case 87964:
      summaryFile = require('../assets/db/summaries/87964.json');
      break;
    case 87965:
      summaryFile = require('../assets/db/summaries/87965.json');
      break;
    case 87966:
      summaryFile = require('../assets/db/summaries/87966.json');
      break;
    case 87967:
      summaryFile = require('../assets/db/summaries/87967.json');
      break;
    case 87968:
      summaryFile = require('../assets/db/summaries/87968.json');
      break;
    case 87969:
      summaryFile = require('../assets/db/summaries/87969.json');
      break;
    case 87970:
      summaryFile = require('../assets/db/summaries/87970.json');
      break;
    case 87971:
      summaryFile = require('../assets/db/summaries/87971.json');
      break;
    case 87972:
      summaryFile = require('../assets/db/summaries/87972.json');
      break;
    case 87973:
      summaryFile = require('../assets/db/summaries/87973.json');
      break;
    case 87974:
      summaryFile = require('../assets/db/summaries/87974.json');
      break;
    case 87975:
      summaryFile = require('../assets/db/summaries/87975.json');
      break;
    case 87976:
      summaryFile = require('../assets/db/summaries/87976.json');
      break;
    case 87977:
      summaryFile = require('../assets/db/summaries/87977.json');
      break;
    case 87978:
      summaryFile = require('../assets/db/summaries/87978.json');
      break;
    case 87979:
      summaryFile = require('../assets/db/summaries/87979.json');
      break;
    case 87980:
      summaryFile = require('../assets/db/summaries/87980.json');
      break;
    case 87981:
      summaryFile = require('../assets/db/summaries/87981.json');
      break;
    case 87982:
      summaryFile = require('../assets/db/summaries/87982.json');
      break;
    case 87983:
      summaryFile = require('../assets/db/summaries/87983.json');
      break;
    case 87984:
      summaryFile = require('../assets/db/summaries/87984.json');
      break;
    case 87985:
      summaryFile = require('../assets/db/summaries/87985.json');
      break;
    case 87986:
      summaryFile = require('../assets/db/summaries/87986.json');
      break;
    case 87987:
      summaryFile = require('../assets/db/summaries/87987.json');
      break;
    case 87988:
      summaryFile = require('../assets/db/summaries/87988.json');
      break;
    case 87989:
      summaryFile = require('../assets/db/summaries/87989.json');
      break;
    case 87990:
      summaryFile = require('../assets/db/summaries/87990.json');
      break;
    case 87991:
      summaryFile = require('../assets/db/summaries/87991.json');
      break;
    case 87992:
      summaryFile = require('../assets/db/summaries/87992.json');
      break;
    case 87993:
      summaryFile = require('../assets/db/summaries/87993.json');
      break;
    case 87994:
      summaryFile = require('../assets/db/summaries/87994.json');
      break;
    case 87995:
      summaryFile = require('../assets/db/summaries/87995.json');
      break;
    case 87996:
      summaryFile = require('../assets/db/summaries/87996.json');
      break;
    case 87997:
      summaryFile = require('../assets/db/summaries/87997.json');
      break;
    case 87998:
      summaryFile = require('../assets/db/summaries/87998.json');
      break;
    case 87999:
      summaryFile = require('../assets/db/summaries/87999.json');
      break;
    case 88000:
      summaryFile = require('../assets/db/summaries/88000.json');
      break;
    case 88001:
      summaryFile = require('../assets/db/summaries/88001.json');
      break;
    case 88002:
      summaryFile = require('../assets/db/summaries/88002.json');
      break;
    case 88003:
      summaryFile = require('../assets/db/summaries/88003.json');
      break;
    case 88004:
      summaryFile = require('../assets/db/summaries/88004.json');
      break;
    case 88005:
      summaryFile = require('../assets/db/summaries/88005.json');
      break;
    case 88006:
      summaryFile = require('../assets/db/summaries/88006.json');
      break;
    case 88007:
      summaryFile = require('../assets/db/summaries/88007.json');
      break;
    case 88008:
      summaryFile = require('../assets/db/summaries/88008.json');
      break;
    case 88009:
      summaryFile = require('../assets/db/summaries/88009.json');
      break;
    case 88010:
      summaryFile = require('../assets/db/summaries/88010.json');
      break;
    case 88011:
      summaryFile = require('../assets/db/summaries/88011.json');
      break;
    case 88012:
      summaryFile = require('../assets/db/summaries/88012.json');
      break;
    case 88013:
      summaryFile = require('../assets/db/summaries/88013.json');
      break;
    case 88014:
      summaryFile = require('../assets/db/summaries/88014.json');
      break;
    case 88015:
      summaryFile = require('../assets/db/summaries/88015.json');
      break;
    case 88016:
      summaryFile = require('../assets/db/summaries/88016.json');
      break;
    case 88017:
      summaryFile = require('../assets/db/summaries/88017.json');
      break;
    case 88018:
      summaryFile = require('../assets/db/summaries/88018.json');
      break;
    case 88019:
      summaryFile = require('../assets/db/summaries/88019.json');
      break;
    case 88020:
      summaryFile = require('../assets/db/summaries/88020.json');
      break;
    case 88021:
      summaryFile = require('../assets/db/summaries/88021.json');
      break;
    case 88022:
      summaryFile = require('../assets/db/summaries/88022.json');
      break;
    case 88023:
      summaryFile = require('../assets/db/summaries/88023.json');
      break;
    case 88024:
      summaryFile = require('../assets/db/summaries/88024.json');
      break;
    case 88025:
      summaryFile = require('../assets/db/summaries/88025.json');
      break;
    case 88026:
      summaryFile = require('../assets/db/summaries/88026.json');
      break;
    case 88027:
      summaryFile = require('../assets/db/summaries/88027.json');
      break;
    case 88028:
      summaryFile = require('../assets/db/summaries/88028.json');
      break;
    case 88029:
      summaryFile = require('../assets/db/summaries/88029.json');
      break;
    case 88030:
      summaryFile = require('../assets/db/summaries/88030.json');
      break;
    case 88031:
      summaryFile = require('../assets/db/summaries/88031.json');
      break;
    case 88032:
      summaryFile = require('../assets/db/summaries/88032.json');
      break;
    case 88033:
      summaryFile = require('../assets/db/summaries/88033.json');
      break;
    case 88034:
      summaryFile = require('../assets/db/summaries/88034.json');
      break;
    case 88035:
      summaryFile = require('../assets/db/summaries/88035.json');
      break;
    case 88036:
      summaryFile = require('../assets/db/summaries/88036.json');
      break;
    case 88037:
      summaryFile = require('../assets/db/summaries/88037.json');
      break;
    case 88038:
      summaryFile = require('../assets/db/summaries/88038.json');
      break;
    case 88039:
      summaryFile = require('../assets/db/summaries/88039.json');
      break;
    case 88040:
      summaryFile = require('../assets/db/summaries/88040.json');
      break;
    case 88041:
      summaryFile = require('../assets/db/summaries/88041.json');
      break;
    case 88042:
      summaryFile = require('../assets/db/summaries/88042.json');
      break;
    case 88043:
      summaryFile = require('../assets/db/summaries/88043.json');
      break;
    case 88044:
      summaryFile = require('../assets/db/summaries/88044.json');
      break;
    case 88045:
      summaryFile = require('../assets/db/summaries/88045.json');
      break;
    case 88046:
      summaryFile = require('../assets/db/summaries/88046.json');
      break;
    case 88047:
      summaryFile = require('../assets/db/summaries/88047.json');
      break;
    case 88048:
      summaryFile = require('../assets/db/summaries/88048.json');
      break;
    case 88049:
      summaryFile = require('../assets/db/summaries/88049.json');
      break;
    case 88050:
      summaryFile = require('../assets/db/summaries/88050.json');
      break;
    case 88051:
      summaryFile = require('../assets/db/summaries/88051.json');
      break;
    case 88052:
      summaryFile = require('../assets/db/summaries/88052.json');
      break;
    case 88053:
      summaryFile = require('../assets/db/summaries/88053.json');
      break;
    case 88054:
      summaryFile = require('../assets/db/summaries/88054.json');
      break;
    case 88055:
      summaryFile = require('../assets/db/summaries/88055.json');
      break;
    case 88056:
      summaryFile = require('../assets/db/summaries/88056.json');
      break;
    case 88057:
      summaryFile = require('../assets/db/summaries/88057.json');
      break;
    case 88058:
      summaryFile = require('../assets/db/summaries/88058.json');
      break;
    case 88059:
      summaryFile = require('../assets/db/summaries/88059.json');
      break;
    case 88060:
      summaryFile = require('../assets/db/summaries/88060.json');
      break;
    case 88061:
      summaryFile = require('../assets/db/summaries/88061.json');
      break;
    case 88062:
      summaryFile = require('../assets/db/summaries/88062.json');
      break;
    case 88063:
      summaryFile = require('../assets/db/summaries/88063.json');
      break;
    case 88064:
      summaryFile = require('../assets/db/summaries/88064.json');
      break;
    case 88065:
      summaryFile = require('../assets/db/summaries/88065.json');
      break;
    case 88066:
      summaryFile = require('../assets/db/summaries/88066.json');
      break;
    case 88067:
      summaryFile = require('../assets/db/summaries/88067.json');
      break;
    case 88068:
      summaryFile = require('../assets/db/summaries/88068.json');
      break;
    case 88069:
      summaryFile = require('../assets/db/summaries/88069.json');
      break;
    case 88070:
      summaryFile = require('../assets/db/summaries/88070.json');
      break;
    case 88071:
      summaryFile = require('../assets/db/summaries/88071.json');
      break;
    case 88072:
      summaryFile = require('../assets/db/summaries/88072.json');
      break;
    case 88073:
      summaryFile = require('../assets/db/summaries/88073.json');
      break;
    case 88074:
      summaryFile = require('../assets/db/summaries/88074.json');
      break;
    case 88075:
      summaryFile = require('../assets/db/summaries/88075.json');
      break;
    case 88076:
      summaryFile = require('../assets/db/summaries/88076.json');
      break;
    case 88077:
      summaryFile = require('../assets/db/summaries/88077.json');
      break;
    case 88078:
      summaryFile = require('../assets/db/summaries/88078.json');
      break;
    case 88079:
      summaryFile = require('../assets/db/summaries/88079.json');
      break;
    case 88080:
      summaryFile = require('../assets/db/summaries/88080.json');
      break;
    case 88081:
      summaryFile = require('../assets/db/summaries/88081.json');
      break;
    case 88082:
      summaryFile = require('../assets/db/summaries/88082.json');
      break;
    case 88083:
      summaryFile = require('../assets/db/summaries/88083.json');
      break;
    case 88084:
      summaryFile = require('../assets/db/summaries/88084.json');
      break;
    case 88085:
      summaryFile = require('../assets/db/summaries/88085.json');
      break;
    case 88086:
      summaryFile = require('../assets/db/summaries/88086.json');
      break;
    case 88087:
      summaryFile = require('../assets/db/summaries/88087.json');
      break;
    case 88088:
      summaryFile = require('../assets/db/summaries/88088.json');
      break;
    case 88089:
      summaryFile = require('../assets/db/summaries/88089.json');
      break;
    case 88090:
      summaryFile = require('../assets/db/summaries/88090.json');
      break;
    case 88091:
      summaryFile = require('../assets/db/summaries/88091.json');
      break;
    case 88092:
      summaryFile = require('../assets/db/summaries/88092.json');
      break;
    case 88093:
      summaryFile = require('../assets/db/summaries/88093.json');
      break;
    case 88094:
      summaryFile = require('../assets/db/summaries/88094.json');
      break;
    case 88095:
      summaryFile = require('../assets/db/summaries/88095.json');
      break;
    case 88096:
      summaryFile = require('../assets/db/summaries/88096.json');
      break;
    case 88097:
      summaryFile = require('../assets/db/summaries/88097.json');
      break;
    case 88098:
      summaryFile = require('../assets/db/summaries/88098.json');
      break;
    case 88099:
      summaryFile = require('../assets/db/summaries/88099.json');
      break;
    case 88100:
      summaryFile = require('../assets/db/summaries/88100.json');
      break;
    case 88101:
      summaryFile = require('../assets/db/summaries/88101.json');
      break;
    case 88102:
      summaryFile = require('../assets/db/summaries/88102.json');
      break;
    case 88103:
      summaryFile = require('../assets/db/summaries/88103.json');
      break;
    case 88104:
      summaryFile = require('../assets/db/summaries/88104.json');
      break;
    case 88105:
      summaryFile = require('../assets/db/summaries/88105.json');
      break;
    case 88106:
      summaryFile = require('../assets/db/summaries/88106.json');
      break;

    default:
      summaryFile = [];
      break;
  }
  return normalizeSummaries(summaryFile);
};
