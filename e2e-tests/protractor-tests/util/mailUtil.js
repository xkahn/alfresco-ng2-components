/*
 * Copyright 2005-2016 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/**
 * Created by Brindusa Gamaniata on 14/10/16.
 *
 * Node-imap reference: https://github.com/mscdex/node-imap
 */

/**
 * @module mailUtil
 */

var Imap = require('imap');
var inspect = require('util').inspect;
var fs = require('fs');

var TestConfig = require("../test.config.js");

var imap = new Imap({
    user: TestConfig.google.gmailEmail,
    password: TestConfig.google.gmailPassword,
    host: TestConfig.google.imap,
    port: TestConfig.google.imapPort,
    tls: TestConfig.google.tls
});

imap.connect();

function openInbox(cb) {
    imap.openBox('INBOX', false, cb);
}

/**
 * Get all message received today with specified subject
 *
 * @param fromDate {String}
 * @param subject {String}
 * @method getMsgBySubject
 * @usage  MailUtil.getMsgBySubject("May 20, 2010","test");
 */
exports.getMsgBySubject = function (fromDate, subject, cb) {
    logger.info("Looking for message with subject: " + subject);

    imap.once('ready', function () {
        openInbox(function (err, box) {
            imap.search(['UNSEEN', ['SINCE', fromDate], ['SUBJECT', subject]], function (err, results) {
                if (err) throw err;
                var f = imap.fetch(results[results.length - 1], {
                    bodies: ['HEADER.FIELDS (DATE)', 'TEXT'],
                    markSeen: true
                });
                f.on('message', function (msg, seqno) {
                    var prefix = '(#' + seqno + ') ';
                    msg.on('body', function (stream, info) {
                        logger.info(prefix + 'Body');
                        stream.pipe(fs.createWriteStream('msg-' + seqno + '-body.txt'));

                        var buffer = '';
                        stream.on('data', function (chunk) {
                            buffer += chunk.toString('utf8');
                            console.log("Content: ", buffer);
                            if (cb) {
                                cb(buffer);
                            }
                        });
                        stream.on('end', function () {
                            console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));
                        });
                    });
                    msg.once('attributes', function (attrs) {
                        console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
                    });
                    msg.once('end', function () {
                        logger.debug(prefix + 'Finished');
                    });
                });
                f.once('error', function (err) {
                    logger.error('Fetch error: ' + err);
                });
                f.once('end', function () {
                    logger.debug('Done fetching all messages!');
                    imap.end();
                });
            });
        });
    });
};

imap.once('error', function (err) {
    logger.error(err);
});

imap.once('end', function () {
    logger.debug('Connection ended');
});