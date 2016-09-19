/*
 * Copyright (c) 2015, 2016, Oracle and/or its affiliates. All rights reserved.
 *
 * MySQL Connector/Node.js is licensed under the terms of the GPLv2
 * <http://www.gnu.org/licenses/old-licenses/gpl-2.0.html>, like most
 * MySQL Connectors. There are special exceptions to the terms and
 * conditions of the GPLv2 as it is applied to this software, see the
 * FLOSS License Exception
 * <http://www.mysql.com/about/legal/licensing/foss-exception.html>
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; version 2 of the
 * License.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA
 * 02110-1301  USA
 */

"use strict";

/**
 *
 * @private
 * @param {String} uri
 * @returns {Properties}
 */
function parseUri(uri) {
    const match = uri.match(/^mysqlx\:\/\/([^\:]+)\:?([^@]*)@(([^:\/?#]*)(?:\:([0-9]+))?)(\/?[^?#]*)(\?[^#]*|)(#.*|)$/);
    console.log(match)
    if (match) {
        return {
            dbUser: match[1],
            dbPassword: match[2],
            host: match[4],
            port: match[5]
        };
    } else {
        // Fallback for old form
        const atpos = uri.lastIndexOf("@");
        if (atpos === -1) {
            throw new Error("Invalid URI");
        }
        const userpass = uri.substr(0, atpos),
            hostport = uri.substr(atpos + 1).split(':', 2),
            userpassarray = userpass.split(':', 2);

        return {
            host: hostport[0],
            port: hostport[1],
            dbUser: userpassarray[0],
            dbPassword: userpassarray[1]
        };
    }
}

module.exports = parseUri;